# 📚 Hướng dẫn Booking Feature

## 📖 Tổng quan

Phần booking bao gồm toàn bộ quy trình từ đặt tour, quản lý lịch sử booking của user, đến dashboard quản lý booking cho admin.

## 🏗️ Kiến trúc

### Backend Routes

#### User Routes
- **POST** `/api/bookings` - Tạo đơn đặt tour mới
  - Body: `{ tour_id, num_people, contact_name, contact_phone, contact_email, note }`
  - Response: `{ message, booking_id, total, tour_name, num_people }`

- **GET** `/api/bookings/my` - Lấy lịch sử booking của user
  - Response: Array of bookings with tour details

- **GET** `/api/bookings/:id` - Lấy chi tiết 1 booking
  - Response: Booking object with full details

- **PUT** `/api/bookings/:id/cancel` - Hủy booking (trong 24h)
  - Body: `{ cancel_reason }`
  - Response: `{ message, booking_id, refund_amount }`

#### Admin Routes
- **GET** `/api/bookings/all/list` - Danh sách tất cả booking
  - Query params: `status`, `search`, `sort`
  - Response: Array of all bookings

- **PUT** `/api/bookings/:id/status` - Cập nhật trạng thái booking
  - Body: `{ status }`
  - Response: `{ message, booking_id, new_status }`

- **GET** `/api/bookings/admin/stats` - Thống kê booking
  - Response: `{ total_bookings, pending_count, confirmed_count, cancelled_count, completed_count, total_revenue }`

### Database Schema

```sql
CREATE TABLE bookings (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  tour_id        INT NOT NULL,
  num_people     INT NOT NULL,
  total_price    DECIMAL(12,2) NOT NULL,
  contact_name   VARCHAR(100),
  contact_phone  VARCHAR(20),
  contact_email  VARCHAR(150),
  note           TEXT,
  status         ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);
```

## 🎨 Frontend Components

### 1. BookingForm Component
**File:** `frontend/src/components/forms/BookingForm.jsx`

Form để đặt tour với các trường:
- Số lượng khách
- Tên khách hàng
- Số điện thoại
- Email
- Ghi chú (tùy chọn)

**Props:**
```javascript
{
  tour: { id, price, name, location, duration, image },
  onSubmit: (bookingData) => Promise,
  isLoading: boolean
}
```

**Sử dụng:**
```jsx
import BookingForm from './components/forms/BookingForm';

<BookingForm 
  tour={tourData}
  onSubmit={handleBooking}
  isLoading={isBooking}
/>
```

### 2. TourDetailPage
**File:** `frontend/src/pages/TourDetailPage.jsx`

Trang chi tiết tour với:
- Hình ảnh banner
- Thông tin tour
- Mô tả chi tiết
- Form đặt tour (BookingForm)
- Liên hệ hỗ trợ

**Route:** `/tours/:id`

### 3. BookingHistory Page
**File:** `frontend/src/pages/BookingHistory.jsx`

Trang lịch sử booking của user với:
- Danh sách tất cả booking
- Filter theo trạng thái
- Thông tin chi tiết từng booking
- Nút hủy booking (cho pending)

**Route:** `/bookings/history`

### 4. AdminBookingManagement Page
**File:** `frontend/src/pages/AdminBookingManagement.jsx`

Dashboard quản lý booking cho admin:
- Thống kê dashboard (tổng booking, doanh thu)
- Danh sách booking dạng table
- Tìm kiếm và lọc booking
- Cập nhật trạng thái booking

**Route:** `/admin/bookings`

## 🎯 Quy Trình Sử Dụng

### User: Đặt Tour

1. User truy cập trang tour (`/tours`)
2. Click vào tour để xem chi tiết (`/tours/:id`)
3. Điền form booking (số lượng khách, thông tin liên hệ)
4. Click "Xác nhận đặt tour"
5. Hệ thống kiểm tra:
   - Slot có đủ không
   - Thông tin hợp lệ
6. Tạo booking với status `pending`
7. Redirect đến lịch sử booking

### User: Quản Lý Booking

1. User truy cập `/bookings/history`
2. Xem danh sách booking của mình
3. Filter theo trạng thái (chờ xác nhận, đã xác nhận, hoàn thành, đã hủy)
4. Nếu booking là `pending` và < 24h → có thể hủy
5. Click "Chi tiết" để xem thông tin chi tiết

### Admin: Quản Lý Booking

1. Admin truy cập `/admin/bookings`
2. Xem dashboard thống kê
3. Tìm kiếm booking theo mã đơn, SĐT khách hàng
4. Lọc booking theo trạng thái
5. Click "Cập nhật" để thay đổi trạng thái
6. Trạng thái có thể: pending → confirmed → completed
   hoặc pending/confirmed → cancelled

## 🔒 Validation Rules

### Booking Creation
```
- tour_id: phải tồn tại
- num_people: 1-100
- contact_name: không được trống
- contact_phone: hợp lệ, >= 9 ký tự
- contact_email: hợp lệ
- Slot: num_people <= available_slots
```

### Booking Cancellation
```
- User chỉ có thể hủy booking của chính mình
- Status phải là pending hoặc confirmed
- Phải trong vòng 24h từ khi tạo
```

## 📱 Styles

### CSS Files
- `frontend/src/styles/booking-form.css` - Form đặt tour
- `frontend/src/styles/booking-history.css` - Lịch sử booking
- `frontend/src/styles/admin-booking.css` - Admin dashboard
- `frontend/src/styles/tour-detail.css` - Trang chi tiết tour

## 🛠️ Middleware & Validation

### Backend Middleware
- `middleware/validate.middleware.js` - Validation booking input
- `middleware/auth.middleware.js` - Xác thực JWT

### Validation Functions
```javascript
// validate.middleware.js
exports.validateBooking = (req, res, next) => {
  // Kiểm tra input hợp lệ
}
```

## 📊 Status Flow

```
pending ──→ confirmed ──→ completed
  ↓
cancelled

pending → cancelled (user < 24h hoặc admin)
confirmed → cancelled (admin)
```

## 🔧 Cách mở rộng

### Thêm tính năng mới

1. **Thêm trường booking mới:**
   - Cập nhật database schema
   - Thêm vào booking model
   - Thêm validation
   - Update HTML form

2. **Thêm trạng thái mới:**
   - Update ENUM trong database
   - Update controller logic
   - Update UI badges

3. **Thêm payment integration:**
   - Tạo payment controller
   - Integrate VNPay/MoMo API
   - Update booking flow

## 📝 Testing

### User Flow
```
1. Login → Tours → Tour Detail → Fill Form → Submit → Booking History
2. Booking History → View Details → Cancel (if < 24h)
```

### Admin Flow
```
1. Login as Admin → Admin Bookings → Search/Filter → Update Status
2. View Stats Dashboard
```

## 🐛 Troubleshooting

### Lỗi "Không đủ chỗ"
- Kiểm tra số slot available = max_people - (số khách pending + confirmed)
- Nếu user hủy booking, slot sẽ được cộng lại

### Lỗi "Đã quá 24h, không thể hủy"
- Kiểm tra created_at timestamp
- Chỉ user < 24h mới có thể hủy

### Lỗi Token
- Kiểm tra localStorage.token
- Đảm bảo token không hết hạn
- Logout và login lại

## 📞 Support

Liên hệ team dev nếu có vấn đề:
- Email: dev@adntravel.com
- Phone: 1900-0000
