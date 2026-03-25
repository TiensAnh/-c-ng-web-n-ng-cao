# Software Requirement Specification (SRS)
## Chức năng: Hệ thống Xác thực người dùng (User Authentication)
**Mã chức năng:** AUTH-01  
**Trạng thái:** Draft  
**Người soạn thảo:** [Tên của bạn]  
**Vai trò:** Business Analyst / Developer  
**Dự án:** Hệ thống Đặt Tour Du lịch Trực tuyến (Online Travel Booking Website)

---

### 1. Mô tả tổng quan (Description)
Cung cấp cơ chế xác thực an toàn để người dùng truy cập vào hệ thống. Phân hệ này phục vụ hai đối tượng chính: 
* **Khách hàng (Customer):** Đăng nhập để tiến hành đặt tour, theo dõi lịch sử chuyến đi, lưu danh sách điểm đến yêu thích và quản lý thông tin cá nhân.
* **Quản trị viên / Nhân viên điều hành (Admin / Operator):** Đăng nhập để truy cập trang quản trị (Dashboard), quản lý danh sách tour, xử lý booking và chăm sóc khách hàng.

### 2. Luồng nghiệp vụ (User Workflow)
| Bước | Hành động người dùng | Phản hồi hệ thống |
| :--- | :--- | :--- |
| 1 | Click nút "Đăng nhập" trên thanh điều hướng hoặc truy cập `/login` | Hiển thị Popup/Trang đăng nhập (Email/Số điện thoại, Password, Remember Me, Đăng nhập qua Google/Facebook). |
| 2 | Nhập thông tin và nhấn "Đăng nhập" | Validate định dạng dữ liệu đầu vào (Client-side & Server-side). |
| 3 | Hệ thống kiểm tra thông tin | So khớp Email/Số điện thoại và mã hóa Password (Bcrypt) trong Database. |
| 4 | Xác thực thành công | Khởi tạo Session/JWT Token. <br> - **Khách hàng:** Chuyển hướng về trang chủ hoặc trang thanh toán (nếu đang đặt dở). <br> - **Admin:** Chuyển hướng vào trang quản trị (Admin Dashboard). |
| 5 | Xác thực thất bại | Giữ nguyên form, hiển thị thông báo lỗi cụ thể và xóa trường Password. |

### 3. Yêu cầu dữ liệu (Data Requirements)
#### 3.1. Dữ liệu đầu vào (Input Fields)
* **Tài khoản (Email / Số điện thoại):** `string`, định dạng hợp lệ, bắt buộc.
* **Password:** `string`, tối thiểu 8 ký tự, ẩn ký tự khi nhập (hỗ trợ nút toggle xem/ẩn mật khẩu), bắt buộc.
* **Remember Me:** `boolean`, tùy chọn (mặc định false).
* **Nút Social Login:** Tùy chọn (Google / Facebook OAuth2).

#### 3.2. Dữ liệu lưu trữ (Database - Bảng `users`)
* `email`: string, unique, index.
* `phone_number`: string, unique, index (thường dùng nhiều trong du lịch).
* `password`: hashed string.
* `role`: enum (`customer`, `operator`, `admin`).
* `status`: enum (`active`, `locked`, `unverified`).
* `last_login_at`: timestamp (để theo dõi truy cập).

### 4. Ràng buộc kỹ thuật & Bảo mật (Technical Constraints)
* **Giao thức:** Bắt buộc sử dụng **HTTPS** để bảo mật thông tin cá nhân và dữ liệu thanh toán của khách hàng.
* **Bảo mật Form:** Tích hợp mã **CSRF Token** trong mọi request POST.
* **Mã hóa:** Mật khẩu phải được băm bằng thuật toán `Bcrypt` hoặc `Argon2`.
* **Throttling (Chống Brute-force):** Khóa tạm thời IP hoặc yêu cầu xác thực reCAPTCHA nếu đăng nhập sai quá 5 lần trong 5 phút.

### 5. Trường hợp ngoại lệ & Xử lý lỗi (Edge Cases)
* **Trường hợp:** Người dùng nhập sai định dạng Email hoặc Số điện thoại.  
  * **Xử lý:** Hiển thị lỗi ngay tại field: "Định dạng email hoặc số điện thoại không hợp lệ".
* **Trường hợp:** Sai mật khẩu hoặc tài khoản không tồn tại.
  * **Xử lý:** Hiển thị thông báo chung: "Tài khoản hoặc mật khẩu không chính xác" (không chỉ rõ lỗi ở đâu để tránh dò rỉ tài khoản).
* **Trường hợp:** Tài khoản bị khóa (VD: do spam đặt tour ảo).  
  * **Xử lý:** Thông báo: "Tài khoản của bạn đã bị khóa do vi phạm chính sách. Vui lòng liên hệ Hotline hỗ trợ".
* **Trường hợp:** Chưa xác thực Email/SĐT sau khi đăng ký.
  * **Xử lý:** Chuyển hướng đến trang yêu cầu xác thực OTP/Link kích hoạt.

### 6. Giao diện (UI/UX)
* **Mobile-First:** Thiết kế Responsive cực kỳ thân thiện với thiết bị di động (do phần lớn khách du lịch truy cập qua điện thoại).
* **Trạng thái xử lý:** Nút "Đăng nhập" hiển thị trạng thái `processing` (spinner) và bị disable khi đang gửi request để tránh click nhiều lần.
* **Phím tắt:** Hỗ trợ nhấn `Enter` ở bất kỳ trường nhập liệu nào để gửi form.
* **Tiện ích:** Có biểu tượng "con mắt" để người dùng xem lại mật khẩu đã nhập nhằm tránh gõ sai trên điện thoại.