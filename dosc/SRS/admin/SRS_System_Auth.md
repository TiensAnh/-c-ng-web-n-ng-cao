# Software Requirements Specification (SRS)
## Module: Hệ thống & Đăng xuất (System & Logout)

### 1. Chức năng Đăng xuất (Logout)
* **Mô tả:** Chấm dứt phiên làm việc của người dùng hiện tại để đảm bảo an toàn thông tin.
* **Luồng xử lý:**
    1. Người dùng nhấn "Đăng xuất".
    2. Hệ thống thu hồi Access Token/Session ID.
    3. Xóa thông tin người dùng lưu tạm ở Local Storage hoặc Cookie.
    4. Chuyển hướng về trang Login.

### 2. Yêu cầu phi chức năng (Non-functional)
* **Bảo mật:** Sau khi đăng xuất, các URL nội bộ (Admin) phải không thể truy cập được thông qua nút "Back" của trình duyệt.
* **Nhật ký:** Hệ thống ghi lại thời điểm đăng xuất cuối cùng của tài khoản vào cơ sở dữ liệu.