<<<<<<< HEAD
# 🌏 Travel Booking Website

Website đặt tour du lịch — **Node.js + Express + MySQL + Vanilla JS**

## 📁 Cấu trúc dự án

```
travel-booking/
├── backend/          ← Node.js + Express API
│   ├── config/       ← DB, App, JWT, Multer
│   ├── controllers/  ← Logic xử lý (Auth, Tour, Booking, Payment, User, Stats, Chatbot)
│   ├── middleware/   ← Xác thực JWT, Validate, Upload
│   ├── routes/       ← Định nghĩa API endpoints
│   ├── models/       ← Model helpers
│   ├── public/       ← Static files (uploads)
│   └── server.js     ← Entry point
├── frontend/         ← HTML + CSS + JS
│   ├── css/          ← Variables, Base, Layout, Components, Responsive
│   ├── js/           ← api.js, auth.js, utils.js, chatbot.js
│   ├── components/   ← navbar, footer, chatbot widget
│   ├── pages/        ← auth, tours, booking, payment, user, admin
│   └── index.html    ← Trang chủ
├── database/         ← Schema + Seed SQL
└── README.md
```

## 🚀 Cài đặt & Chạy

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```

### 2. Cấu hình môi trường
```bash
cp .env.example .env
# Chỉnh sửa .env với thông tin DB của bạn
```

### 3. Tạo database
```bash
mysql -u root -p < ../database/schema.sql
mysql -u root -p travel_booking < ../database/seed.sql
```

### 4. Chạy server
```bash
npm run dev       # development (nodemon)
npm start         # production
```

### 5. Mở frontend
Dùng Live Server (VS Code) hoặc bất kỳ static server nào tại thư mục `frontend/`

## 🔌 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | /api/auth/register | Đăng ký | ❌ |
| POST | /api/auth/login | Đăng nhập | ❌ |
| GET  | /api/tours | Danh sách tour | ❌ |
| GET  | /api/tours/:id | Chi tiết tour | ❌ |
| POST | /api/bookings | Đặt tour | ✅ |
| GET  | /api/bookings/my | Lịch sử đặt | ✅ |
| PUT  | /api/bookings/:id/cancel | Hủy tour | ✅ |
| POST | /api/payments | Thanh toán | ✅ |
| GET  | /api/stats/dashboard | Thống kê | 👑 Admin |
| POST | /api/chatbot/message | Chat bot | ❌ |

## 📦 Tech Stack

- **Backend**: Node.js, Express, MySQL2, JWT, Bcrypt, Multer
- **Frontend**: HTML5, CSS3 (Variables + Grid + Flexbox), ES Modules
- **Database**: MySQL 8+
- **Chatbot**: Rule-based + keyword matching
=======
THÀNH VIÊN NHÓM
NGUYỄN ĐỒNG TIẾN ANH 23810310080
NGUYỄN VĂN ANH ĐỨC   23810310118
ĐINH TRỌNG NGHĨA     23810310119
## Tài liệu SRS

### Admin
- [Xem SRS Admin](dosc/SRS/admin)

### User
- [Xem SRS User](dosc/SRS/user)

### Nâng cao
- [Xem SRS Advanced](dosc/SRS/SRS_chatbox_consulting.md)
>>>>>>> 9e35cde6c669d795b588d8f6555abfa33839daae
