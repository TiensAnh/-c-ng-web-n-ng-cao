-- Dữ liệu mẫu
USE travel_booking;

INSERT INTO users (name,email,password,role) VALUES
('Admin','admin@travel.vn','$2a$10$placeholder_hashed','admin'),
('Nguyễn Văn A','user@travel.vn','$2a$10$placeholder_hashed','user');

INSERT INTO categories (name,description) VALUES
('Biển đảo','Tour tham quan biển đảo'),('Miền núi','Tour leo núi, trekking'),
('Di sản','Tour tham quan di sản văn hóa'),('Thành phố','City tour khám phá đô thị');

INSERT INTO tours (name,description,price,duration,location,category_id,max_people,start_date,end_date) VALUES
('Hạ Long Bay 3N2Đ','Khám phá vịnh Hạ Long huyền thoại',2500000,3,'Quảng Ninh',1,20,'2024-12-20','2024-12-22'),
('Hội An Cổ Trấn 4N3Đ','Đắm mình trong phố cổ Hội An',3200000,4,'Quảng Nam',3,15,'2024-12-25','2024-12-28'),
('Sapa Trek 3N2Đ','Trekking qua bản làng dân tộc',2800000,3,'Lào Cai',2,12,'2025-01-05','2025-01-07'),
('Phú Quốc Resort 5N4Đ','Nghỉ dưỡng cao cấp tại đảo ngọc',5500000,5,'Kiên Giang',1,25,'2025-01-10','2025-01-14'),
('Đà Nẵng - Bà Nà 3N2Đ','Cầu Vàng + Bà Nà Hills + Phố cổ',2900000,3,'Đà Nẵng',3,20,'2025-01-15','2025-01-17');
