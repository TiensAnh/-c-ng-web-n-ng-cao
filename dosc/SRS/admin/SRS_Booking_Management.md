# Software Requirements Specification (SRS)
## Module: Quản lý Đơn đặt tour (Booking Management)

### 1. Mô tả chức năng
Module này quản lý toàn bộ vòng đời của một đơn đặt tour từ khi khách hàng gửi yêu cầu cho đến khi chuyến đi hoàn thành hoặc bị hủy.

### 2. Yêu cầu chức năng
| ID | Chức năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| **BK-01** | **Xem danh sách đơn** | Hiển thị danh sách: Mã đơn, Tên khách, Tên tour, Ngày khởi hành, Tổng tiền, Trạng thái. |
| **BK-02** | **Bộ lọc & Tìm kiếm** | Tìm kiếm theo Mã đơn, SĐT khách hàng. Lọc theo trạng thái (Chờ duyệt, Đã xác nhận, Đã hủy). |
| **BK-03** | **Xác nhận đơn** | Admin kiểm tra chỗ trống và chuyển trạng thái đơn sang `Confirmed`. |
| **BK-04** | **Hủy đơn đặt** | Cho phép Admin hoặc Khách hàng hủy đơn. Yêu cầu nhập lý do hủy. |
| **BK-05** | **Cập nhật số chỗ** | Hệ thống tự động trừ/cộng lại số chỗ (slot) của Tour tương ứng khi Đặt/Hủy đơn. |

### 3. Quy tắc nghiệp vụ (Business Rules)
* **Ràng buộc xác nhận:** Không thể xác nhận đơn nếu số lượng khách trong đơn lớn hơn số chỗ còn trống (Available Slots) của tour.
* **Thời hạn giữ chỗ:** Đơn hàng ở trạng thái `Pending` sẽ bị tự động hủy sau 24h nếu không được xác nhận hoặc thanh toán (tùy cấu hình).