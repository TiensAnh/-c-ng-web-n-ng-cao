# Software Requirements Specification (SRS)
## Chức năng: Quản lý Danh mục Tour (Tour Category Management)

### 1. Giới thiệu (Introduction)
Chức năng này cho phép Quản trị viên thiết lập cấu trúc phân loại cho các sản phẩm du lịch. Danh mục giúp tổ chức dữ liệu khoa học trên hệ thống quản trị (Backend) và tối ưu hóa bộ lọc tìm kiếm cho khách hàng (Frontend/SEO).

---

### 2. Yêu cầu chức năng (Functional Requirements)

| ID | Tên chức năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| **CAT-01** | **Thêm danh mục** | Tạo mới danh mục (Tên, Mô tả, Ảnh đại diện, Slug SEO). |
| **CAT-02** | **Quản lý Cấu trúc** | Hỗ trợ danh mục đa cấp (Cha - Con). Ví dụ: *Du lịch miền Bắc (Cha) > Tour Hà Giang (Con)*. |
| **CAT-03** | **Thứ tự hiển thị** | Admin có thể đánh số thứ tự (Priority) để quyết định danh mục nào hiện lên trước trên Website. |
| **CAT-04** | **Quản lý trạng thái** | Bật/Tắt hiển thị danh mục. Khi tắt, các tour thuộc danh mục này cũng sẽ bị ẩn khỏi bộ lọc. |
| **CAT-05** | **Tối ưu SEO** | Nhập các thẻ Meta Title, Meta Description, Keywords cho từng danh mục. |

---

### 3. Thuộc tính dữ liệu (Data Attributes)

| Trường dữ liệu | Kiểu dữ liệu | Ràng buộc |
| :--- | :--- | :--- |
| **Tên danh mục** | String (255) | Bắt buộc, không trùng lặp. |
| **Slug** | String (255) | Tự động sinh từ tên (Ví dụ: `tour-trong-nuoc`), duy nhất. |
| **Danh mục cha** | Integer (ID) | Null nếu là danh mục gốc. |
| **Mô tả ngắn** | Text | Tối đa 500 ký tự. |
| **Icon/Thumbnail** | Image File | Định dạng .jpg, .png, .webp (Max 2MB). |
| **Trạng thái** | Boolean | Mặc định là `Active`. |

---

### 4. Quy tắc nghiệp vụ (Business Rules)

1.  **Xóa danh mục:** Không được phép xóa danh mục nếu đang có Tour đang hoạt động (Active) thuộc danh mục đó. Hệ thống yêu cầu chuyển Tour sang danh mục khác trước khi xóa.
2.  **Cấu trúc cây:** Hệ thống nên giới hạn tối đa 3 cấp danh mục (Cấp 1 > Cấp 2 > Cấp 3) để đảm bảo trải nghiệm người dùng không bị quá phức tạp.
3.  **URL (Slug):** Nếu Admin thay đổi Slug của danh mục, hệ thống nên có cơ chế gợi ý Redirect 301 để tránh lỗi 404 cho SEO.

---

### 5. Giao diện & Trải nghiệm (UI/UX)

* **Dạng cây (Tree View):** Hiển thị danh mục theo sơ đồ phân cấp để Admin dễ hình dung cấu trúc.
* **Kéo thả (Drag & Drop):** Cho phép kéo thả để thay đổi vị trí hoặc thay đổi cấp bậc của danh mục.
* **Quick Toggle:** Nút gạt (Switch) để bật/tắt trạng thái hiển thị ngay tại trang danh sách mà không cần vào trang chi tiết.

---

### 6. Yêu cầu phi chức năng (Non-functional Requirements)

* **Tốc độ:** Truy vấn lấy danh mục phải được lưu vào **Cache** (như Redis) vì dữ liệu này ít thay đổi nhưng tần suất truy cập rất cao.
* **Tính nhất quán:** Khi đổi tên danh mục cha, các đường dẫn (Breadcrumb) của danh mục con và tour con phải được cập nhật tương ứng.