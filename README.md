# EduArchive - Hệ Thống Quản Lý & Số Hóa Hồ Sơ Trường Học

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-14%2F16-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![MinIO](https://img.shields.io/badge/MinIO-S3_Compatible-red.svg)](https://min.io/)
[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED.svg)](https://www.docker.com/)

**EduArchive** là giải pháp phần mềm hiện đại quản lý kho lưu trữ hồ sơ vật lý kết hợp số hóa tài liệu cho các trường học và cơ sở giáo dục. Hệ thống hỗ trợ đầy đủ vòng đời hồ sơ từ quản lý vị trí kho vật lý, tạo thẻ QR dán hồ sơ, quét mã QR đa chế độ, quản lý mượn/trả, lưu trữ số hóa trên MinIO S3, cảnh báo quá hạn tự động, lập đề xuất tiêu hủy và báo cáo thống kê trực quan.

---

## 🌟 TÍNH NĂNG NỔI BẬT (KEY FEATURES)

### 1. 🔐 Phân quyền & Bảo mật Chặt chẽ (RBAC & Production Hardening)
- Phân quyền theo vai trò (ADMIN, RECORDS_OFFICER, TEACHER) với JWT Token & HttpOnly Refresh Cookie.
- Bảo vệ tài liệu mật (`CONFIDENTIAL`): Chặn tài khoản Giáo viên xem/tải tài liệu bảo mật và hiển thị modal cảnh báo 403 Forbidden thay vì tự động redirect.
- Cấu hình môi trường bảo mật qua `.env`, chống lộ secret key và hỗ trợ Dynamic CORS theo tên miền deployment.

### 2. 🗄️ Quản lý Kho Hồ Sơ Vật Lý & Số Hóa S3
- Độc lập quản lý vị trí lưu trữ vật lý 3 cấp: **Phòng/Kho**, **Kệ hàng**, **Ngăn chứa**.
- Tích hợp MinIO S3 Client lưu trữ file scan, tự động tính toán mã băm bảm bảo tính toàn vẹn **SHA-256 Checksum**.

### 3. 📱 Mã QR Đa Chế Độ & Thẻ QR In Dán
- Tự động sinh thẻ mã QR mã hóa mã hồ sơ và thông tin lưu kho, hỗ trợ xem & tải về dạng ảnh in dán lên bìa hồ sơ.
- Modal quét mã QR đa chế độ: Hỗ trợ webcam trực tiếp, máy quét mã vạch USB và tải ảnh QR từ máy tính.

### 4. 🔄 Nghiệp Vụ Mượn / Trả & Đặt Giữ Hồ Sơ
- Quy trình mượn hồ sơ từ đăng ký đặt giữ, tự động đổi trạng thái sang `DA_DAT_GIU`, phê duyệt văn thư và xác nhận nhận lại về kho.

### 5. ⏰ Tác Vụ Định Kỳ & Báo Cáo Tiêu Hủy
- Task tự động `@Scheduled` quét phiếu quá hạn hàng ngày và đổi trạng thái cảnh báo.
- Lập đề xuất tiêu hủy đối với hồ sơ quá thời hạn bảo quan kho.
- Giao diện Dashboard và biểu đồ thống kê KPI báo cáo dành cho Ban Giám Hiệu.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG (TECH STACK)

### Backend
- **Framework**: Spring Boot 3.3.1 (Java 21)
- **Security**: Spring Security 6 & Java JWT (Auth0)
- **Database**: PostgreSQL 16 & Flyway Database Migration
- **Object Storage**: MinIO Java SDK (S3-compatible)
- **QR Engine**: ZXing (Zebra Crossing)

### Frontend
- **Framework**: Next.js 14/16 (App Router, TypeScript)
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Icons & UI**: Lucide React, Phosphor Icons, TanStack Query
- **QR Reader**: HTML5-QRCode parser

### Infrastructure & Proxy
- **Reverse Proxy**: Nginx Alpine (Gateway Port 80)
- **Containerization**: Multi-stage Dockerfiles (Eclipse Temurin JRE Alpine & Next.js Standalone)
- **Orchestration**: Docker Compose

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY NHANH (QUICK START)

Chi tiết hướng dẫn cài đặt có tại [SETUP.md](file:///c:/Users/Admin/Documents/GitHub/Minh_project_01/SETUP.md).

### Khởi chạy môi trường Production với Docker:

1. **Chuẩn bị cấu hình môi trường**:
   ```bash
   cp .env.example .env
   ```

2. **Khởi chạy hệ thống**:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

3. **Truy cập ứng dụng**:
   - 🌐 **Web App**: [http://localhost](http://localhost)
   - 📦 **MinIO Console**: [http://localhost:9001](http://localhost:9001)

### Tài khoản mặc định:
- **Quản trị viên**: `admin` / `password`
- **Cán bộ Văn thư**: `vanthu` / `password`
- **Giáo viên**: `giaovien` / `password`

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```
Minh_project_01/
├── backend/                  # Mã nguồn Spring Boot 3 Backend
│   ├── src/main/java/        # Enums, Entities, Repositories, Services, Controllers
│   ├── src/main/resources/   # DB Migrations (Flyway SQL) & application.yml
│   └── Dockerfile            # Multi-stage Maven -> Alpine JRE Dockerfile
├── frontend/                 # Mã nguồn Next.js 14+ Frontend
│   ├── src/app/              # Next.js App Router Pages (Dashboard, Records, Loans, v.v.)
│   ├── src/components/       # UI Components & AccessDeniedModal
│   ├── src/lib/              # API Client Wrapper & Token Storage
│   └── Dockerfile            # Multi-stage Next.js Standalone Dockerfile
├── nginx/                    # Cấu hình Nginx Reverse Proxy (default.conf)
├── .env.example              # Template cấu hình biến môi trường
├── docker-compose.yml        # Docker Compose cho môi trường Dev
├── docker-compose.prod.yml   # Docker Compose hoàn chỉnh cho Production (Port 80)
├── PROGRESS.md               # Nhật ký tiến độ phát triển 6 tuần
└── SETUP.md                  # Hướng dẫn chi tiết cài đặt & vận hành
```

---

## 📄 LICENSE

Dự án phát triển cho mục đích giáo dục và quản lý lưu trữ trường học. Tất cả các quyền được bảo lưu.
