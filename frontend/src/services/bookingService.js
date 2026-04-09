// Booking Service - các hàm call API để quản lý booking

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class BookingService {
  /**
   * Tạo đơn đặt tour mới
   */
  static async createBooking(bookingData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  }

  /**
   * Lấy lịch sử booking của user đang đăng nhập
   */
  static async getMyBookings() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  /**
   * Lấy chi tiết 1 booking của user
   */
  static async getBookingById(bookingId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  /**
   * Hủy booking (user)
   */
  static async cancelBooking(bookingId, cancelReason = '') {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cancel_reason: cancelReason }),
    });
    return response.json();
  }

  /**
   * Lấy danh sách tất cả booking (Admin)
   */
  static async getAllBookings(filters = {}) {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await fetch(`${API_BASE}/bookings/all/list?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  /**
   * Cập nhật trạng thái booking (Admin)
   */
  static async updateBookingStatus(bookingId, status) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  /**
   * Lấy thống kê booking (Admin)
   */
  static async getBookingStats() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/bookings/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }
}

export default BookingService;
