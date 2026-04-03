# Chức năng: Chatbox tư vấn tour

### 1. Mô tả tóm tắt
Cung cấp kênh giao tiếp trực tuyến giữa người dùng và đội ngũ hỗ trợ (hoặc Bot) để giải đáp thắc mắc về lịch trình, giá cả và các dịch vụ đi kèm trước khi đặt tour.

### 2. Luồng nghiệp vụ (Workflow)
1. **Kích hoạt:** Người dùng nhấn vào biểu tượng Chat ở góc màn hình.
2. **Gửi tin nhắn:** Người dùng nhập nội dung câu hỏi (hỗ trợ văn bản, icon, gửi ảnh/file).
3. **Phản hồi:** - **Giai đoạn 1 (Bot):** Tự động trả lời các câu hỏi thường gặp (FAQ) như chính sách hủy, giá trẻ em.
   - **Giai đoạn 2 (Nhân viên):** Nếu Bot không giải quyết được, hệ thống điều hướng tin nhắn đến nhân viên tư vấn đang online.
4. **Lưu trữ:** Toàn bộ nội dung chat được lưu lại trong phiên làm việc để người dùng có thể xem lại sau khi load lại trang.

### 3. Các yêu cầu chức năng
* **Real-time Communication:** Tin nhắn phải được gửi và nhận tức thời (sử dụng Socket.io hoặc Firebase).
* **Thông báo (Notification):** Hiển thị chấm đỏ hoặc âm thanh khi có tin nhắn mới từ tư vấn viên.
* **Lịch sử chat:** Hiển thị lại các tin nhắn cũ trong vòng 24h - 48h gần nhất.
* **Trạng thái hoạt động:** Hiển thị nhân viên đang "Online" hoặc "Offline". Nếu Offline, hiển thị form để lại lời nhắn/Email.

### 4. Yêu cầu phi chức năng
* **Tốc độ:** Độ trễ tin nhắn dưới 500ms.
* **Bảo mật:** Nội dung cuộc trò chuyện được mã hóa và chỉ người dùng/nhân viên liên quan mới có quyền xem.