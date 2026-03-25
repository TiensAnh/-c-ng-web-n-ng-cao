# Software Requirements Specification (SRS)
## Module: Quản lý Thanh toán (Payment Management)

### 1. Mô tả chức năng
Theo dõi dòng tiền, quản lý các giao dịch thanh toán liên quan đến đơn đặt tour để đảm bảo tính minh bạch tài chính.

### 2. Yêu cầu chức năng
| ID | Chức năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| **PM-01** | **Theo dõi trạng thái** | Gán trạng thái thanh toán: `Chưa thanh toán`, `Đã đặt cọc`, `Đã thanh toán`, `Đã hoàn tiền`. |
| **PM-02** | **Xác thực giao dịch** | Admin cập nhật thủ công các giao dịch chuyển khoản hoặc tiền mặt. |
| **PM-03** | **Cổng thanh toán** | Kết nối với các bên thứ 3 (Momo, VNPAY...) để cập nhật trạng thái tự động. |
| **PM-04** | **Lịch sử thanh toán** | Lưu lại: Mã giao dịch, Phương thức, Số tiền, Thời gian, Người thực hiện xác nhận. |

### 3. Yêu cầu dữ liệu
* Mọi giao dịch phải có mã tham chiếu (Reference ID) từ ngân hàng hoặc hệ thống thanh toán.
* Phải có chức năng tải lên ảnh chụp hóa đơn/bill chuyển khoản để đối soát.