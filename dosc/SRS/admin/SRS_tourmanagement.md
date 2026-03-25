# Software Requirements Specification (SRS)
## Chức năng: Quản lý Tour Du lịch (Tour Management)

### 1. Giới thiệu (Introduction)
Module này cho phép nhân viên điều hành tour (Operator) và Admin tạo, chỉnh sửa, và quản lý các gói tour du lịch. Đây là trung tâm dữ liệu để khách hàng có thể tìm kiếm và đặt chỗ (Booking).

---

### 2. Yêu cầu chức năng (Functional Requirements)

Hệ thống quản lý tour cần xử lý các nghiệp vụ chính sau:

| ID | Tên chức năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| **TR-01** | **Đăng ký Tour mới** | Nhập tên tour, mô tả, điểm đến, thời lượng (ví dụ: 3 ngày 2 đêm). |
| **TR-02** | **Quản lý Lịch trình** | Thiết lập chi tiết từng ngày (Ngày 1 đi đâu, ăn gì, ở đâu). |
| **TR-03** | **Quản lý Giá & Slot** | Thiết lập giá cho người lớn/trẻ em và giới hạn số lượng khách tối đa. |
| **TR-04** | **Quản lý Khởi hành** | Tạo các ngày khởi hành khác nhau cho cùng một mẫu tour. |
| **TR-05** | **Quản lý Hình ảnh** | Tải lên và sắp xếp bộ sưu tập ảnh (Gallery) cho tour. |
| **TR-06** | **Trạng thái Tour** | Chuyển đổi trạng thái: `Nháp`, `Đang bán`, `Đã đóng`, `Hết chỗ`. |

---

### 3. Luồng nghiệp vụ chính (Key Workflows)

#### 3.1. Luồng tạo Tour và Mở bán
1. **Operator** tạo khung tour (Tên, nội dung giới thiệu).
2. **Operator** thêm lịch trình chi tiết cho từng ngày.
3. **Operator** cấu hình giá và chọn các ngày khởi hành (ví dụ: Thứ 7 hàng tuần).
4. **Hệ thống** kiểm tra tính đầy đủ của thông tin.
5. **Admin** duyệt và chuyển trạng thái sang `Đang bán` để hiển thị lên Website cho khách đặt.

---

### 4. Yêu cầu dữ liệu (Data Requirements)

Một đối tượng **Tour** cần các trường dữ liệu bắt buộc sau:

* **Mã Tour (Tour Code):** Tự động sinh (Ví dụ: TO-2024-001).
* **Điểm khởi hành / Điểm đến:** Liên kết với danh mục địa danh.
* **Giá gốc & Giá khuyến mãi:** Số dương, đơn vị VNĐ hoặc USD.
* **Số lượng chỗ (Capacity):** Tối thiểu 1 người.
* **Chính sách hoàn hủy:** Văn bản quy định điều kiện hủy tour.

---

### 5. Yêu cầu phi chức năng (Non-functional Requirements)

* **Tính toàn vẹn:** Khi một tour đã có khách đặt (Booking), không được phép xóa tour đó (chỉ được ẩn hoặc đóng).
* **Hiệu năng:** Tìm kiếm tour theo bộ lọc (Giá, địa điểm, ngày đi) phải trả kết quả trong < 2 giây.
* **Hình ảnh:** Hệ thống tự động tối ưu hóa (resize/compress) ảnh khi upload để đảm bảo tốc độ tải trang web.
* **Đa ngôn ngữ:** Hỗ trợ nhập nội dung tour bằng Tiếng Việt và Tiếng Anh (nếu có yêu cầu quốc tế).

---

### 6. Các quy tắc nghiệp vụ (Business Rules)

* **Ràng buộc thời gian:** Ngày kết thúc tour phải sau ngày khởi hành.
* **Ràng buộc giá:** Giá trẻ em không được lớn hơn giá người lớn.
* **Cảnh báo hết chỗ:** Hệ thống phải tự động chuyển trạng thái tour sang `Hết chỗ` khi số lượng khách đặt thành công bằng với `Capacity`.

---

### 7. Giao diện người dùng dự kiến (UI Components)
* **Dashboard:** Biểu đồ hiển thị các tour bán chạy nhất.
* **Calendar View:** Xem danh sách tour khởi hành theo dạng lịch tháng.
* **Editor:** Trình soạn thảo văn bản (WYSIWYG) để viết mô tả lịch trình sinh động.