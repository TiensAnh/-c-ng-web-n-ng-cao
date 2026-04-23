# ADN Travel Booking Website

## Thành viên nhóm

| Vai trò | Họ và tên | Lớp | Mã sinh viên |
|---|---|---|---|
| Nhóm trưởng | NGUYỄN ĐỒNG TIẾN ANH | D18CNPM2 | 23810310080 |
| Thành viên | NGUYỄN VĂN ANH ĐỨC | D18CNPM2 | 23810310118 |
| Thành viên | ĐINH TRỌNG NGHĨA | D18CNPM2 | 23810310119 |

## 📑 Mục lục

- [📊 Dự án](#-dự-án)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [📋 Nội dung chính](#-nội-dung-chính)
- [🏗️ Cấu trúc dự án](#️-cấu-trúc-dự-án)
- [🗄️ Cấu trúc Database](#️-cấu-trúc-database)
- [🚀 Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [🔐 Tài khoản Test](#-tài-khoản-test)
- [✅ Kiểm tra setup thành công](#-kiểm-tra-setup-thành-công)
- [🔧 Các lệnh hữu ích](#-các-lệnh-hữu-ích)
- [🛠️ Hướng dẫn chạy trên máy dev mới](#️-hướng-dẫn-chạy-trên-máy-dev-mới)

## 📊 Dự án

Website đặt tour du lịch ADN Travel.

Hệ thống hỗ trợ:

- Xem danh sách tour và chi tiết tour
- Đăng ký, đăng nhập người dùng
- Đặt tour, thanh toán, theo dõi booking
- Thanh toán demo bằng chuyển khoản/QR và chờ admin xác nhận giao dịch
- Đánh giá chuyến đi sau khi hoàn thành
- Quản trị tour, booking, user, review, payment
- Chatbot hiện ở mức rule-based/demo, chưa tích hợp AI hoàn chỉnh

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ | Lý do lựa chọn |
|---|---|---|
| Ngôn ngữ Backend | Node.js | Phổ biến, dễ triển khai, phù hợp bài tập nhóm |
| Framework Backend | Express 4.x | Nhẹ, dễ tổ chức API, dễ mở rộng |
| Database | MySQL 8 / XAMPP | Dễ cài trên máy dev, quen thuộc với môn học |
| Authentication | JWT + Bcrypt | Bảo mật cơ bản, dễ tách frontend/backend |
| Upload | Multer | Xử lý upload ảnh tour đơn giản |
| Frontend | React 19 + Vite | Nhanh, dễ chia component, dev server tốt |
| Routing | React Router | Quản lý route public/admin rõ ràng |
| HTTP Client | Fetch API + apiClient nội bộ | Gọn, không thêm phụ thuộc không cần thiết |
| Payment Demo | Chuyển khoản + QR + admin xác nhận | Phù hợp demo nghiệp vụ, dễ test trên máy local |
| Logging | Morgan | Theo dõi request backend khi dev |
| Security | Helmet + CORS | Bổ sung header bảo mật và giới hạn origin |
| Version Control | Git | Quản lý source code và làm việc nhóm |

## 📋 Nội dung chính

### 👨‍💻 Công việc đã hoàn tất

- NGUYỄN ĐỒNG TIẾN ANH - cấu trúc dự án, giao diện frontend public/admin, tích hợp frontend với backend
- NGUYỄN VĂN ANH ĐỨC - phân tích chức năng, backend user, booking, payment, admin auth
- ĐINH TRỌNG NGHĨA - thiết kế cơ sở dữ liệu, seed dữ liệu, schema nghiệp vụ, backend tổng hợp admin
- Hoàn thiện luồng payment theo hướng tạo giao dịch `PENDING`, admin xác nhận rồi mới chuyển booking sang `CONFIRMED`
- Bổ sung giao diện chuyển khoản ngân hàng, QR thanh toán và quản lý payment phía admin
- Bổ sung migration và chuẩn hóa dữ liệu payment, role, review để đồng bộ code với tài liệu

### 📏 Quy tắc chung

- Thống nhất dùng tiếng Anh cho tên file/code, tiếng Việt không dấu cho message khi cần
- Tách riêng backend và frontend
- Không commit `.env`, `node_modules`, `dist`
- Luồng nghiệp vụ booking:
  - `PENDING`: đã đặt, chưa xử lý hoặc chưa thanh toán
  - `CONFIRMED`: payment đã được admin xác nhận hoặc booking đã được xác nhận
  - `COMPLETED`: chuyến đi đã hoàn thành
  - `CANCELLED`: booking đã hủy

### 📈 Báo cáo tiến độ

- Report 03/04/2026
- Report 08/04/2026
- Report 09/04/2026
- Report 11/04/2026
- Report 12/04/2026
- Report 14/04/2026
- Report 17/04/2026
- Report 20/04/2026
- Report 22/04/2026
- Report 23/04/2026

## 🏗️ Cấu trúc dự án

```text
travel-booking/
├── backend/                    # API Node.js + Express + MySQL
│   ├── config/                 # app, db, jwt, upload
│   ├── controllers/            # auth, tours, bookings, payments, reviews, users, stats
│   ├── database/               # schema.sql, seed.sql, migrations
│   ├── middleware/             # auth middleware, upload middleware
│   ├── public/                 # uploads và static files
│   ├── routes/                 # định nghĩa API routes
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── admin/              # giao diện quản trị
│   │   ├── app/                # router app
│   │   ├── public/             # giao diện người dùng
│   │   └── shared/             # component, context, service dùng chung
│   ├── .env.example
│   └── package.json
├── dosc/                       # tài liệu SRS / mô tả nghiệp vụ
├── reports/                    # báo cáo tiến độ
├── BOOKING_GUIDE.md
└── README.md
```

## 🗄️ Cấu trúc Database

### Entity Relationship Diagram (mô tả logic)

```text
ADMINS
└── quản trị viên hệ thống

USERS
├── có nhiều BOOKINGS
└── có nhiều REVIEWS

TOURS
├── có nhiều BOOKINGS
└── có nhiều REVIEWS

BOOKINGS
├── thuộc về 1 USER
├── thuộc về 1 TOUR
├── có nhiều BOOKING_CUSTOMERS
├── có thể có PAYMENT
└── có thể có 1 REVIEW

PAYMENTS
└── thuộc về 1 BOOKING

REVIEWS
├── thuộc về 1 BOOKING
├── thuộc về 1 USER
└── thuộc về 1 TOUR
```

### Thông tin chính các bảng

| Bảng | Mô tả | Trường chính |
|---|---|---|
| admins | Quản lý tài khoản admin | id, username, email, password |
| users | Người dùng hệ thống | id, name, email, phone, password, role |
| tours | Thông tin tour | id, title, price, location, duration, status |
| bookings | Đơn đặt tour | id, user_id, tour_id, travel_date, total_price, status |
| booking_customers | Hành khách trong booking | id, booking_id, full_name, gender, date_of_birth |
| payments | Giao dịch thanh toán | id, booking_id, amount, method, status, paid_at |
| reviews | Đánh giá sau chuyến đi | id, booking_id, user_id, tour_id, rating, comment, status |

Lưu ý nghiệp vụ hiện tại:

- Payment có thể được tạo ở trạng thái `PENDING`
- Admin xác nhận payment thành công rồi booking mới chuyển sang `CONFIRMED`
- Review chỉ áp dụng cho booking đã `COMPLETED`

## 🚀 Hướng dẫn cài đặt

### 📋 Yêu cầu hệ thống

- Node.js 18+
- MySQL 8+ hoặc XAMPP
- Git

### 1️⃣ Clone repository

```bash
git clone <repository-url>
cd travel-booking
```

### 2️⃣ Cấu hình Database

Tạo database mới, ví dụ:

```sql
CREATE DATABASE travel_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Import file schema:

```bash
mysql -u root -p travel_booking < backend/database/schema.sql
```

Import seed data:

```bash
mysql -u root -p travel_booking < backend/database/seed.sql
```

### 3️⃣ Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Chỉnh `.env` theo máy của bạn:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=travel_booking
FRONTEND_URL=http://localhost:5173
JWT_SECRET=secret123
```

Chạy backend:

```bash
npm run dev
```

Backend chạy tại:

```text
http://localhost:3000
```

### 4️⃣ Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Biến môi trường frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

Chạy frontend:

```bash
npm run dev
```

Frontend chạy tại:

```text
http://localhost:5173
```

## 🔐 Tài khoản Test

Sau khi import `seed.sql`, có thể dùng nhanh:

| Vai trò | Email | Mật khẩu | Mục đích |
|---|---|---|---|
| Admin | admin@adntravel.vn | admin123 | Quản trị tour, booking, user, review |
| Admin | ops@adntravel.vn | ops12345 | Quản trị vận hành |
| User | user1@gmail.com | 123456 | Đặt tour, thanh toán, đánh giá |
| User | user2@gmail.com | 123456 | Test thêm luồng booking/user |

Lưu ý: Chỉ dùng cho development/testing.

## ✅ Kiểm tra setup thành công

- Database import thành công, có đủ bảng trong MySQL
- Backend health check:

```bash
curl http://localhost:3000/api/health
```

- Frontend mở được:

```text
http://localhost:5173
```

- Admin login được
- User login được và xem được danh sách tour

## 🔧 Các lệnh hữu ích

### Backend

```bash
cd backend

# chạy dev
npm run dev

# chạy production mode
npm start
```

### Frontend

```bash
cd frontend

# chạy dev
npm run dev

# build production
npm run build

# preview build
npm run preview
```

### Database

```bash
# import schema
mysql -u root -p travel_booking < backend/database/schema.sql

# import seed
mysql -u root -p travel_booking < backend/database/seed.sql
```

## 🛠️ Hướng dẫn chạy trên máy dev mới

1. Cài Node.js, MySQL/XAMPP, Git
2. Clone repo
3. Tạo database `travel_booking`
4. Import `backend/database/schema.sql`
5. Import `backend/database/seed.sql`
6. Cấu hình `backend/.env`
7. Cấu hình `frontend/.env`
8. Chạy backend bằng `npm run dev`
9. Chạy frontend bằng `npm run dev`
10. Kiểm tra:
    - backend `http://localhost:3000/api/health`
    - frontend `http://localhost:5173`
    - admin/user login thành công
