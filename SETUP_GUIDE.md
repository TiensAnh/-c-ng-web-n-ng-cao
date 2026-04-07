# 🌏 Travel Booking Website - Hướng Dẫn Cài Đặt & Chạy Chi Tiết

> **Hướng dẫn hoàn chỉnh để clone project từ Git và chạy trên máy tính cá nhân**

## 📋 Mục Lục

1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Bước 1: Clone Project từ Git](#bước-1-clone-project-từ-git)
3. [Bước 2: Cài Đặt Dependencies](#bước-2-cài-đặt-dependencies)
4. [Bước 3: Cấu Hình Database](#bước-3-cấu-hình-database)
5. [Bước 4: Cấu Hình Environment](#bước-4-cấu-hình-environment)
6. [Bước 5: Chạy Project](#bước-5-chạy-project)
7. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
8. [API Endpoints](#api-endpoints)
9. [Các Lệnh Hữu Ích](#các-lệnh-hữu-ích)
10. [Khắc Phục Sự Cố](#khắc-phục-sự-cố)

---

## ✅ Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy chắc chắn rằng máy bạn có:

| Yêu Cầu | Phiên Bản | Link Download |
|---------|-----------|---------------|
| **Node.js & npm** | 16.0.0+ | https://nodejs.org/ |
| **MySQL Server** | 8.0+ | https://dev.mysql.com/downloads/mysql/ |
| **Git** | 2.0.0+ | https://git-scm.com/ |
| **Visual Studio Code** (tuỳ chọn) | Latest | https://code.visualstudio.com/ |

### Kiểm Tra Cài Đặt

Mở **Command Prompt** hoặc **PowerShell** và chạy các lệnh sau:

```bash
# Kiểm tra Node.js
node --version
npm --version

# Kiểm tra MySQL
mysql --version

# Kiểm tra Git
git --version
```

Nếu lệnh nào không hoạt động, hãy cài đặt phần mềm tương ứng.

---

## 🚀 Bước 1: Clone Project từ Git

### 1.1 Chọn Thư Mục Lưu Trữ

Chọn một thư mục trên máy bạn để lưu trữ project. Ví dụ: `D:\code` hoặc `C:\Projects`

```bash
# Tạo thư mục (tuỳ chọn)
mkdir C:\Projects
cd C:\Projects

# Hoặc nếu bạn đã có thư mục
cd D:\code
```

### 1.2 Clone Repository

```bash
git clone https://github.com/your-username/travel-booking.git
cd travel-booking
```

Nếu repository là **private**, bạn cần xác thực:

```bash
# Sử dụng token hoặc SSH key
git clone https://your-token@github.com/your-username/travel-booking.git
```

### 1.3 Kiểm Tra Project

```bash
# Xem nội dung thư mục
dir
# Hoặc dùng lệnh Unix
ls -la
```

Bạn sẽ thấy các thư mục: `backend/`, `frontend/`, `database/`, `docs/`

---

## 📦 Bước 2: Cài Đặt Dependencies

### 2.1 Cài Đặt Backend Dependencies

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt tất cả dependencies
npm install

# Kiểm tra quá trình cài đặt
npm list
```

### 2.2 Cài Đặt Frontend Dependencies

```bash
# Quay lại thư mục gốc
cd ..

# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt tất cả dependencies
npm install

# Kiểm tra quá trình cài đặt
npm list
```

**Lưu ý:** Nếu gặp lỗi trong quá trình cài đặt, thử xóa `node_modules` và `package-lock.json`:

```bash
# Xóa các file cache
rm -r node_modules
del package-lock.json

# Cài lại từ đầu
npm install
```

---

## 🗄️ Bước 3: Cấu Hình Database

### 3.1 Khởi Động MySQL Server

**Trên Windows:**
- MySQL sẽ tự động khởi động khi bạn cài đặt
- Hoặc bạn có thể khởi động thủ công qua **Services**

**Trên Mac/Linux:**

```bash
mysql.server start
```

### 3.2 Tạo Database

Mở **Command Prompt** hoặc **PowerShell** và đăng nhập MySQL:

```bash
# Đăng nhập MySQL (mật khẩu là trống nếu bạn không đặt)
mysql -u root -p

# Nếu được hỏi password, nhập password bạn đặt khi cài MySQL
```

### 3.3 Tạo Schema Database

Sau khi đăng nhập, chạy các lệnh SQL:

```sql
-- Tạo database
CREATE DATABASE IF NOT EXISTS travel_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE travel_booking;
```

### 3.4 Nhập Schema từ File

**Cách 1: Từ file SQL (Nên dùng)**

```bash
# Từ thư mục gốc của project
mysql -u root -p travel_booking < database/schema.sql

# Nếu được hỏi password, nhập password MySQL của bạn
```

**Cách 2: Sử dụng MySQL Command**

```bash
mysql -u root < database/schema.sql
mysql -u root -p travel_booking < database/seed.sql
```

### 3.5 Xác Minh Database

```bash
mysql -u root -p

# Sau khi đăng nhập
SHOW DATABASES;
USE travel_booking;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

---

## ⚙️ Bước 4: Cấu Hình Environment

### 4.1 Tạo File `.env` - Backend

**Di chuyển vào thư mục backend:**

```bash
cd backend
```

**Tạo file `.env` (sao chép từ `.env.example`):**

```bash
# Trên Windows
copy .env.example .env

# Trên Mac/Linux
cp .env.example .env
```

**Nếu `.env.example` không tồn tại, tạo file `.env` thủ công:**

```bash
# Tạo file .env
type nul > .env
```

### 4.2 Chỉnh Sửa File `.env`

Mở file `.env` bằng text editor (VS Code, Notepad, etc.) và điền thông tin:

```env
# ============================================
#  BACKEND ENVIRONMENT VARIABLES
# ============================================

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=         (để trống nếu không có password)
DB_NAME=travel_booking
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_12345
JWT_EXPIRE=7d

# Session Configuration
SESSION_SECRET=your_session_secret_key_123

# CORS Configuration
CLIENT_URL=http://localhost:5173

# File Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880     (5MB)

# Payment Gateway (nếu có)
PAYMENT_API_KEY=your_payment_api_key
PAYMENT_MERCHANT_ID=your_merchant_id
```

**Ví dụ `.env` cơ bản:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=travel_booking
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=travel_booking_jwt_secret_2024
SESSION_SECRET=travel_session_secret_2024
CLIENT_URL=http://localhost:5173
```

### 4.3 Tạo File `.env` - Frontend (Tuỳ Chọn)

**Di chuyển vào thư mục frontend:**

```bash
cd ../frontend
```

**Tạo file `.env`:**

```env
# Frontend Environment Variables
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Travel Booking
VITE_APP_VERSION=1.0.0
```

---

## 🎯 Bước 5: Chạy Project

### 5.1 Chạy Backend Server

**Terminal 1 - Backend:**

```bash
# Từ thư mục gốc
cd backend

# Chạy ở development mode (với nodemon - tự restart khi có thay đổi)
npm run dev

# Hoặc chạy ở production mode
npm start
```

**Kết quả mong đợi:**

```
🚀 Server đang chạy tại http://localhost:5000
✅ Kết nối Database thành công
```

### 5.2 Chạy Frontend Server

**Terminal 2 - Frontend:**

```bash
# Từ thư mục gốc
cd frontend

# Chạy development server (Vite)
npm run dev
```

**Kết quả mong đợi:**

```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 5.3 Mở Ứng Dụng trong Trình Duyệt

1. **Backend API**: http://localhost:5000
2. **Frontend UI**: http://localhost:5173

Nếu tất cả chạy thành công, bạn sẽ thấy giao diện Travel Booking website.

---

## 📁 Cấu Trúc Thư Mục

```
travel-booking/
├── backend/                          # Node.js + Express Backend
│   ├── config/
│   │   ├── app.js                   # Express config
│   │   ├── db.js                    # MySQL connection
│   │   ├── jwt.js                   # JWT config
│   │   └── multer.js                # File upload config
│   ├── controllers/                  # Business logic
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── tour.controller.js       # Tour management
│   │   ├── booking.controller.js    # Booking management
│   │   ├── payment.controller.js    # Payment processing
│   │   ├── user.controller.js       # User management
│   │   ├── stats.controller.js      # Statistics & Analytics
│   │   └── chatbot.controller.js    # Chatbot logic
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT authentication
│   │   ├── upload.middleware.js     # File upload handler
│   │   └── validate.middleware.js   # Input validation
│   ├── routes/                       # API endpoints
│   │   ├── auth.routes.js           # /api/auth/...
│   │   ├── tour.routes.js           # /api/tours/...
│   │   ├── booking.routes.js        # /api/bookings/...
│   │   ├── payment.routes.js        # /api/payments/...
│   │   ├── user.routes.js           # /api/users/...
│   │   ├── admin.routes.js          # /api/admin/...
│   │   ├── stats.routes.js          # /api/stats/...
│   │   └── chatbot.routes.js        # /api/chatbot/...
│   ├── models/                       # Database models/helpers
│   │   ├── user.model.js
│   │   ├── tour.model.js
│   │   ├── booking.model.js
│   │   ├── category.model.js
│   │   └── payment.model.js
│   ├── public/
│   │   └── uploads/                 # Uploaded files
│   ├── .env.example                 # Environment template
│   ├── .env                         # Environment configuration (tạo thủ công)
│   ├── package.json
│   ├── server.js                    # Entry point
│   └── node_modules/                # Dependencies
│
├── frontend/                         # React + Vite Frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   └── FeatureCard.jsx
│   │   ├── pages/                   # Page components
│   │   │   └── HomePage.jsx
│   │   ├── layouts/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── services/
│   │   │   └── api.js               # API client
│   │   ├── hooks/
│   │   │   └── useDocumentTitle.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   ├── utils/
│   │   │   └── format.js
│   │   ├── assets/
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env                         # Environment (tuỳ chọn)
│   └── node_modules/
│
├── database/
│   ├── schema.sql                   # Database structure
│   └── seed.sql                     # Sample data
│
├── docs/
│   └── SRS/                         # System Requirements
│       ├── admin/                   # Admin documentation
│       └── user/                    # User documentation
│
├── SETUP_GUIDE.md                   # Hướng dẫn này
└── README.md
```

---

## 🔌 API Endpoints

### Authentication (Công Khai)

| Method | Endpoint | Mô Tả | Body |
|--------|----------|-------|------|
| POST | `/api/auth/register` | Đăng ký tài khoản | `{name, email, password}` |
| POST | `/api/auth/login` | Đăng nhập | `{email, password}` |
| POST | `/api/auth/logout` | Đăng xuất | - |
| POST | `/api/auth/refresh` | Làm mới token | - |

### Tours (Công Khai)

| Method | Endpoint | Mô Tả | Query |
|--------|----------|-------|-------|
| GET | `/api/tours` | Danh sách tour | `?page=1&limit=10&category=1` |
| GET | `/api/tours/:id` | Chi tiết tour | - |
| GET | `/api/tours/search` | Tìm kiếm tour | `?keyword=vietnam` |

### Bookings (Cần Xác Thực)

| Method | Endpoint | Mô Tả | Headers |
|--------|----------|-------|---------|
| POST | `/api/bookings` | Đặt tour | `Authorization: Bearer {token}` |
| GET | `/api/bookings/my` | Lịch sử đặt của tôi | `Authorization: Bearer {token}` |
| GET | `/api/bookings/:id` | Chi tiết booking | `Authorization: Bearer {token}` |
| PUT | `/api/bookings/:id/cancel` | Hủy booking | `Authorization: Bearer {token}` |

### Payments (Cần Xác Thực)

| Method | Endpoint | Mô Tá | Headers |
|--------|----------|-------|---------|
| POST | `/api/payments` | Tạo thanh toán | `Authorization: Bearer {token}` |
| GET | `/api/payments/:id` | Chi tiết thanh toán | `Authorization: Bearer {token}` |

### Admin (Cần Quyền Admin)

| Method | Endpoint | Mô Tá | Headers |
|--------|----------|-------|---------|
| GET | `/api/admin/users` | Danh sách user | `Authorization: Bearer {admin_token}` |
| GET | `/api/admin/tours` | Quản lý tour | `Authorization: Bearer {admin_token}` |
| GET | `/api/admin/bookings` | Quản lý booking | `Authorization: Bearer {admin_token}` |
| GET | `/api/stats/dashboard` | Thống kê dashboard | `Authorization: Bearer {admin_token}` |

### Chatbot (Công Khai)

| Method | Endpoint | Mô Tá | Body |
|--------|----------|-------|------|
| POST | `/api/chatbot/message` | Gửi tin nhắn | `{message, userId}` |

---

## 🛠️ Các Lệnh Hữu Ích

### Backend

```bash
# Di chuyển vào backend
cd backend

# Chạy development (với nodemon auto-restart)
npm run dev

# Chạy production
npm start

# Cài package mới
npm install package-name

# Xóa dependencies
npm uninstall package-name

# Xem tất cả scripts
npm run
```

### Frontend

```bash
# Di chuyển vào frontend
cd frontend

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview

# Cài package mới
npm install package-name
```

### Database

```bash
# Đăng nhập MySQL
mysql -u root -p

# Sau khi đăng nhập:
USE travel_booking;
SHOW TABLES;
SELECT * FROM users;

# Xuất backup database
mysqldump -u root -p travel_booking > backup.sql

# Nhập từ backup
mysql -u root -p travel_booking < backup.sql
```

### Git

```bash
# Kiểm tra trạng thái
git status

# Cập nhật từ remote
git pull origin main

# Commit change
git add .
git commit -m "Mô tả thay đổi"

# Push lên remote
git push origin main

# Tạo branch mới
git checkout -b feature/new-feature

# Xem lịch sử commit
git log
```

---

## ❌ Khắc Phục Sự Cố

### Lỗi: "Cannot find module 'express'"

**Nguyên nhân:** Dependencies chưa được cài đặt

**Giải pháp:**
```bash
cd backend
npm install
```

### Lỗi: "Port 5000 already in use"

**Nguyên nhân:** Có ứng dụng khác đang dùng port 5000

**Giải pháp:**
```bash
# Thay đổi PORT trong .env
PORT=5001

# Hoặc kill process đang dùng port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Lỗi: "ECONNREFUSED - MySQL connection failed"

**Nguyên nhân:** MySQL chưa được khởi động hoặc cấu hình sai

**Giải pháp:**
```bash
# Kiểm tra MySQL đang chạy không
mysql -u root -p

# Nếu không chạy, khởi động MySQL
# Windows: Sử dụng Services hoặc "mysql.server start"
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Lỗi: "Database 'travel_booking' does not exist"

**Nguyên nhân:** Database chưa được tạo

**Giải pháp:**
```bash
mysql -u root -p travel_booking < ../database/schema.sql
```

### Lỗi: "Access denied for user 'root'@'localhost'"

**Nguyên nhân:** Mật khẩu MySQL không đúng

**Giải pháp:**
- Kiểm tra mật khẩu trong file `.env`
- Đặt lại mật khẩu MySQL nếu quên

```bash
# Reset MySQL password (Linux/Mac)
sudo mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Lỗi: "Port 5173 already in use"

**Giải pháp:**
- Đóng các terminal khác đang chạy Vite
- Sử dụng port khác trong `vite.config.js`

### Node Modules Bị Lỗi

**Giải pháp toàn diện:**
```bash
# Backend
cd backend
rm -r node_modules
del package-lock.json (Windows) hoặc rm package-lock.json
npm install

# Frontend
cd ../frontend
rm -r node_modules
del package-lock.json (Windows) hoặc rm package-lock.json
npm install
```

### Vẫn Gặp Lỗi?

1. Kiểm tra lại các yêu cầu hệ thống
2. Xóa toàn bộ `node_modules` và cài lại
3. Kiểm tra file `.env` có đúng format không
4. Xem log trong console để tìm lỗi cụ thể
5. Hỏi trên GitHub Issues hoặc nhóm phát triển

---

## 📚 Tech Stack

| Layer | Công Nghệ | Phiên Bản |
|-------|-----------|----------|
| **Frontend** | Vite, React, HTML5, CSS3 | Latest |
| **Backend** | Node.js, Express.js | 16+, 4.18+ |
| **Database** | MySQL | 8.0+ |
| **Authentication** | JWT, Bcrypt | 9.0+, 2.4+ |
| **File Upload** | Multer | 1.4+ |
| **Security** | Helmet, CORS | 7.0+, 2.8+ |
| **Development** | Nodemon | 3.0+ |

---

## ✨ Tiếp Theo

1. **Đăng nhập vào Admin**: Sử dụng tài khoản admin mặc định (nếu có)
2. **Thực hiện Seed Data**: Chạy `database/seed.sql` để có dữ liệu mẫu
3. **Khám Phá API**: Xem tài liệu API chi tiết
4. **Phát Triển Tính Năng**: Tạo branch mới và bắt đầu phát triển

---

## 👥 Hỗ Trợ & Liên Hệ

- **GitHub**: https://github.com/your-username/travel-booking
- **Issues**: Báo cáo lỗi trên GitHub Issues
- **Nhóm Phát Triển**:
  - NGUYỄN ĐỒNG TIẾN ANH (23810310080)
  - NGUYỄN VĂN ANH ĐỨC (23810310118)
  - ĐINH TRỌNG NGHĨA (23810310119)

---

## 📝 Ghi Chú

- Luôn sử dụng `.env` để quản lý cấu hình cá nhân
- Không commit `.env` file lên Git
- Giữ dependencies cập nhật bằng `npm update`
- Sử dụng các commit messages rõ ràng
- Luôn test trước khi push

---

**Chúc bạn thành công với dự án Travel Booking! 🎉**

*Cập nhật lần cuối: 05/04/2026*
