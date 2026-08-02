# HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH HỆ THỐNG (SETUP GUIDE)

Tài liệu hướng dẫn thiết lập môi trường, cấu hình biến bảo mật và triển khai hệ thống **EduArchive - Quản lý & Số hóa Hồ sơ Trường học**.

---

## 1. ĐIỀU KIỆN TIÊN QUYẾT (PREREQUISITES)

Yêu cầu máy chủ hoặc máy phát triển cài đặt sẵn:
- **Docker Desktop** (hoặc Docker Engine 24.0+ & Docker Compose v2.20+)
- **Git**
- *(Tùy chọn cho Dev cục bộ không dùng Docker)*: Java OpenJDK 21, Maven 3.9+, Node.js 20+

---

## 2. CHUẨN BỊ TỆP CẤU HÌNH MÔI TRƯỜNG (.ENV)

1. Sao chép tệp mẫu `.env.example` thành `.env` tại thư mục gốc dự án:
   ```bash
   cp .env.example .env
   ```

2. Cập nhật các thông số bảo mật trong tệp `.env`:
   ```env
   # PostgreSQL Credentials
   POSTGRES_DB=school_records
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_secure_postgres_password

   # MinIO Object Storage
   MINIO_ROOT_USER=minioadmin
   MINIO_ROOT_PASSWORD=your_secure_minio_password
   MINIO_ACCESS_KEY=minioadmin
   MINIO_SECRET_KEY=your_secure_minio_password
   MINIO_BUCKET_NAME=school-records

   # JWT Secret Key (Tối thiểu 256-bit)
   JWT_SECRET=c2Nob29sLXJlY29yZHMtc3VwZXItc2VjcmV0LWtleS0xMjM0NTY3ODkwLWFiY2RlZi1naGlqaw==

   # CORS Allowed Origins
   CORS_ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://127.0.0.1
   ```

---

## 3. TRIỂN KHAI MÔI TRƯỜNG PRODUCTION (KHUYÊN DÙNG)

Môi trường Production chạy đóng gói đầy đủ 5 containers tích hợp **Nginx Reverse Proxy** ở cổng 80:

```bash
# Khởi tạo và build toàn bộ containers
docker compose -f docker-compose.prod.yml up -d --build
```

### Các địa chỉ truy cập Production:
- **Ứng dụng Web (Nginx Gateway)**: [http://localhost](http://localhost)
- **MinIO Storage Console**: [http://localhost:9001](http://localhost:9001)

### Lệnh kiểm tra và dừng hệ thống:
```bash
# Xem danh sách container đang chạy
docker compose -f docker-compose.prod.yml ps

# Xem log thời gian thực của backend
docker compose -f docker-compose.prod.yml logs -f backend

# Dừng hệ thống Production
docker compose -f docker-compose.prod.yml down
```

---

## 4. TRIỂN KHAI MÔI TRƯỜNG DEVELOPMENT

Nếu bạn muốn chạy riêng từng dịch vụ trong giai đoạn phát triển:

### Cách 1: Chạy Infrastructure bằng Docker
```bash
# Chỉ chạy Database PostgreSQL và MinIO S3
docker compose up -d db minio

# Chạy Backend (Spring Boot):
cd backend
./mvnw spring-boot:run

# Chạy Frontend (Next.js):
cd frontend
npm install
npm run dev
```

### Cách 2: Chạy toàn bộ Stack Dev bằng Docker Compose
```bash
docker compose up -d --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

---

## 5. DỮ LIỆU KHỞI TẠO BAN ĐẦU (SEED DATA & USERS)

Database tự động chạy **Flyway Migration** (`V1__initial_schema.sql`) khi Backend khởi động để nạp danh mục, quyền và 3 tài khoản mặc định:

| Mật khẩu chung | Tên đăng nhập | Vai trò | Quyền hạn tiêu biểu |
| :--- | :--- | :--- | :--- |
| `password` | `admin` | **ADMIN** | Quản trị hệ thống, xem báo cáo, toàn quyền hồ sơ & tải tài liệu `CONFIDENTIAL`. |
| `password` | `vanthu` | **RECORDS_OFFICER** | Quản lý lưu trữ, upload số hóa, duyệt phiếu mượn/trả, lập đề xuất tiêu hủy. |
| `password` | `giaovien` | **TEACHER** | Đăng ký mượn hồ sơ, xem số hóa `COMMON`. *(Tự động chuyển hướng về `/dashboard/records` & bị chặn 403 khi tải tài liệu `CONFIDENTIAL`)* |

---

## 6. CHẠY KIỂM THỬ TỰ ĐỘNG (AUTOMATED TESTS)

Chạy bộ kiểm thử tích hợp backend (bao gồm `SmokeTest` và `ConfidentialAccessTest`):

```bash
cd backend
mvn test
```
