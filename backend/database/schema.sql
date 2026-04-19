CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tours (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    location VARCHAR(255),
    duration INT,
    max_people INT,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tour_id INT,
    travel_date DATE,
    number_of_people INT,
    total_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE booking_customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    full_name VARCHAR(255),
    gender VARCHAR(10),
    date_of_birth DATE,
    passport VARCHAR(50),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    amount DECIMAL(10,2),
    method VARCHAR(50),
    status VARCHAR(20),
    paid_at DATETIME,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tour_id INT,
    rating INT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);