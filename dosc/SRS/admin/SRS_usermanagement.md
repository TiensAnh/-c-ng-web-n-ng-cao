# Software Requirements Specification (SRS)
## Chức năng: Quản lý người dùng (User Management)

### 1. Giới thiệu (Introduction)
Tài liệu này mô tả các yêu cầu chức năng và phi chức năng cho module Quản lý người dùng. Mục tiêu là cung cấp cho Quản trị viên công cụ để kiểm soát danh tính, quyền hạn và bảo mật dữ liệu trong hệ thống.

---

### 2. Tóm tắt chức năng (Functional Requirements)

Hệ thống phải hỗ trợ các tác vụ quản trị cốt lõi sau:

| ID | Tên chức năng | Mô tả chi tiết | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Tạo người dùng** | Admin nhập thông tin: Họ tên, Email (Unique), Số điện thoại, Vai trò. | Admin |
| **FR-02** | **Danh sách & Bộ lọc** | Hiển thị danh sách tập trung. Cho phép tìm kiếm theo Tên/Email và lọc theo Trạng thái/Vai trò. | Admin, Manager |
| **FR-03** | **Cập nhật thông tin** | Thay đổi thông tin cá nhân hoặc gán lại vai trò cho người dùng hiện có. | Admin |
| **FR-04** | **Phân quyền (RBAC)** | Thiết lập quyền truy cập dựa trên vai trò (Ví dụ: Admin, Editor, Viewer). | Admin |
| **FR-05** | **Khóa/Kích hoạt** | Tạm dừng quyền truy cập của người dùng mà không cần xóa dữ liệu lịch sử. | Admin |
| **FR-06** | **Reset Mật khẩu** | Gửi email yêu cầu đặt lại mật khẩu hoặc cấp mật khẩu tạm thời. | Admin, User |

---

### 3. Quy trình nghiệp vụ (Use Case Description)

#### Use Case: Thêm mới người dùng
1. **Tác nhân:** Quản trị viên (Admin).
2. **Tiền điều kiện:** Admin đã đăng nhập thành công vào hệ thống.
3. **Luồng sự kiện chính:**
    - Bước 1: Admin chọn "Thêm mới người dùng".
    - Bước 2: Hệ thống hiển thị biểu mẫu nhập liệu.
    - Bước 3: Admin nhập thông tin bắt buộc và nhấn "Lưu".
    - Bước 4: Hệ thống kiểm tra tính hợp lệ của dữ liệu (Validate).
    - Bước 5: Hệ thống lưu vào cơ sở dữ liệu và gửi email kích hoạt cho người dùng.
4. **Hệ quả:** Một tài khoản mới được tạo với trạng thái `Pending` hoặc `Active`.

---

### 4. Yêu cầu phi chức năng (Non-functional Requirements)

#### 4.1. Bảo mật (Security)
* **Mã hóa:** Tất cả mật khẩu phải được băm (hash) bằng thuật toán mạnh như **BCrypt** hoặc **Argon2** trước khi lưu trữ.
* **Xác thực:** Hỗ trợ xác thực 2 lớp (2FA) cho các tài khoản có quyền Admin.
* **Nhật ký (Audit Log):** Mọi hành động Thêm/Sửa/Xóa phải được ghi lại (ai làm, làm lúc nào, thay đổi nội dung gì).

#### 4.2. Hiệu năng (Performance)
* **Tốc độ tải:** Trang danh sách người dùng phải hiển thị trong vòng **< 1.5 giây** với 5,000 bản ghi (có phân trang).
* **Concurrent:** Hệ thống hỗ trợ tối thiểu 50 Admin thao tác cùng lúc trên module quản lý.

#### 4.3. Giao diện (Usability)
* Giao diện phải tương thích với cả Desktop và Tablet (Responsive).
* Phải có hộp thoại xác nhận (Confirmation Dialog) khi thực hiện hành động **Xóa** hoặc **Khóa** tài khoản.

---

### 5. Ràng buộc dữ liệu (Data Constraints)

* **Định dạng Email:** Phải tuân thủ biểu thức chính quy (Regex) chuẩn.
* **Độ dài mật khẩu:** Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
* **Số điện thoại:** Chỉ chấp nhận định dạng số, từ 10-11 chữ số.

---

### 6. Giao diện dự kiến (UI Mockup)
*(Ghi chú: Phần này sẽ bao gồm các wireframe cho màn hình Danh sách người dùng và màn hình Form chi tiết).*