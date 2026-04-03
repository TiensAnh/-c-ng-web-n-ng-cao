-- ==============================================
--  TRAVEL BOOKING — Database Schema
-- ==============================================
CREATE DATABASE IF NOT EXISTS travel_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_booking;

-- Users
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  phone      VARCHAR(20),
  avatar     VARCHAR(255),
  role       ENUM('user','admin') DEFAULT 'user',
  status     ENUM('active','locked') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tours
CREATE TABLE tours (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(200) NOT NULL,
  description  TEXT,
  price        DECIMAL(12,2) NOT NULL,
  duration     INT COMMENT 'Số ngày',
  location     VARCHAR(200),
  category_id  INT,
  image        VARCHAR(255),
  max_people   INT DEFAULT 20,
  start_date   DATE,
  end_date     DATE,
  status       ENUM('active','inactive') DEFAULT 'active',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Bookings
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

-- Payments
CREATE TABLE payments (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  booking_id  INT NOT NULL,
  user_id     INT NOT NULL,
  amount      DECIMAL(12,2) NOT NULL,
  method      ENUM('vnpay','momo','bank_transfer','cash') NOT NULL,
  status      ENUM('pending','success','failed') DEFAULT 'pending',
  transaction_id VARCHAR(100),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE
);

-- Reviews
CREATE TABLE reviews (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  tour_id    INT NOT NULL,
  rating     TINYINT CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);
