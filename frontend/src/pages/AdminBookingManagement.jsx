import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import '../styles/admin-booking.css';

const API_BASE = 'http://localhost:5000/api';

function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, [search, statusFilter]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const [bookingsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/bookings/all/list?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/bookings/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (bookingsRes.ok) {
        setBookings(await bookingsRes.json());
      }
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking || !updateStatus) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/bookings/${selectedBooking.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: updateStatus }),
      });

      if (response.ok) {
        alert('Cập nhật trạng thái thành công!');
        setSelectedBooking(null);
        fetchData();
      }
    } catch (error) {
      alert('Lỗi khi cập nhật');
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#4caf50',
      cancelled: '#f44336',
      completed: '#2196f3',
    };
    return colors[status] || '#999';
  };

  if (isLoading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="admin-booking">
      <h1>Quản lý đơn đặt tour</h1>

      {/* Stats */}
      {stats && (
        <div className="admin-booking__stats">
          <div className="stat-card">
            <h3>{stats.total_bookings}</h3>
            <p>Tổng đơn đặt</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pending_count || 0}</h3>
            <p>Chờ xác nhận</p>
          </div>
          <div className="stat-card">
            <h3>{stats.confirmed_count || 0}</h3>
            <p>Đã xác nhận</p>
          </div>
          <div className="stat-card">
            <h3>${(stats.total_revenue || 0).toLocaleString('vi-VN')}</h3>
            <p>Doanh thu</p>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="admin-booking__controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã đơn, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-booking__search"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-booking__filter"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Bookings Table */}
      <table className="admin-booking__table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tour</th>
            <th>Số khách</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <strong>#{booking.id}</strong>
              </td>
              <td>
                <div>
                  <p>{booking.contact_name}</p>
                  <small>{booking.contact_phone}</small>
                </div>
              </td>
              <td>{booking.tour_name}</td>
              <td>{booking.num_people}</td>
              <td className="table__price">
                {booking.total_price.toLocaleString('vi-VN')} đ
              </td>
              <td>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {booking.status}
                </span>
              </td>
              <td>{new Date(booking.created_at).toLocaleDateString('vi-VN')}</td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setUpdateStatus(booking.status);
                  }}
                  className="btn-small"
                >
                  Cập nhật
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Status Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Cập nhật trạng thái</h2>
            <p>Đơn: {selectedBooking.contact_name} - {selectedBooking.tour_name}</p>

            <select
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              className="modal-select"
            >
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>

            <div className="modal-actions">
              <Button onClick={handleUpdateStatus} className="btn-primary">
                Lưu
              </Button>
              <Button onClick={() => setSelectedBooking(null)} className="btn-secondary">
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBookingManagement;
