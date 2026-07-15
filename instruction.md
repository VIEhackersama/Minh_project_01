```markdown
# PROJECT BRIEF — HỆ THỐNG SỐ HÓA QUẢN LÝ HỒ SƠ GIẤY (TRƯỜNG TIỂU HỌC)

> Tài liệu này là bản brief kỹ thuật đầy đủ, tích hợp kiến trúc Monorepo, Docker-ready, kịch bản SQL chi tiết và kế hoạch hành động 6 tuần dành cho AI Coding Agent (Claude Code / Cursor) để tự động scaffold và phát triển dự án.

---

## 1. NGUYÊN TẮC PHÁT TRIỂN & THIẾT KẾ KỸ THUẬT (AI GUARDRAILS)

1. **Kiến trúc Monorepo:** Gom toàn bộ Backend (Spring Boot 3.x, Java 21) và Frontend (Next.js 14+ App Router, TypeScript) vào chung một repository duy nhất nhằm tối giản hóa tích hợp, quản lý và vận hành.
2. **Đóng gói Docker-ready:** Tập trung cấu hình Docker, Docker Compose hoàn thiện chạy offline/local mượt mà, sẵn sàng triển khai thực tế mà không bị phụ thuộc vào các hạ tầng cloud phức tạp.
3. **Thực dụng & Chạy thực tế (Working over Theory):** Ưu tiên xây dựng các chức năng chạy được (working product) phục vụ đúng yêu cầu đồ án thực tế, đơn giản hóa các tiêu chuẩn kiến trúc quá hàn lâm.
4. **Kiểm soát tài liệu mật (Confidential Security):** Hồ sơ có mức độ mật là `CONFIDENTIAL` (chứa PII học sinh, hồ sơ kỷ luật/y tế) thì hệ thống phải chặn không cho vai trò `TEACHER` xem file số hóa. Giáo viên chỉ thấy metadata, muốn xem nội dung phải lập phiếu mượn bản cứng.
5. **Chống xung đột mượn hồ sơ (Concurrency Control):** Khi người dùng bấm đăng ký mượn hồ sơ giấy, hệ thống lập tức gọi `datGiuHoSo()` để chuyển trạng thái hồ sơ sang `DA_DAT_GIU`, tạm khóa quyền mượn từ người khác cho đến khi yêu cầu được phê duyệt hoặc hủy bỏ.
6. **Không lưu file trực tiếp vào DB:** Toàn bộ file scan được đẩy thẳng lên MinIO (S3-compatible), DB chỉ ghi nhận metadata (dung lượng, hash md5/sha256, format, relative path) để tối ưu hiệu năng.

---

## 2. CẤU TRÚC THƯ MỤC MONOREPO

```text
school-records-monorepo/
├── backend/                  # Spring Boot App (Port 8080)
│   ├── src/main/java/com/school/records/
│   │   ├── config/           # Cấu hình Security, CORS, OpenAPI, Storage
│   │   ├── security/         # JwtFilter, JwtService, UserDetailsService
│   │   ├── common/           # Response chung, Exception Handler, Tiện ích
│   │   └── modules/          # Tổ chức Package-by-feature
│   │       ├── admin/        # Tài khoản, Vai trò, Quyền, Nhật ký, Tham số hệ thống
│   │       ├── records/      # Hồ sơ, Tài liệu số hóa, Vị trí kho, QR, Tiêu hủy
│   │       ├── operations/   # Tra cứu, Mượn trả vật lý, Hạn trả
│   │       └── reports/      # Thống kê, Báo cáo
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/     # Flyway SQL script
│   ├── Dockerfile            # Multi-stage build (Temurin-21 JRE)
│   └── pom.xml
├── frontend/                 # Next.js App (Port 3000)
│   ├── app/                  # Next.js 14 App Router (Auth, Dashboard, Records, Loans)
│   ├── components/           # UI Reusable components
│   ├── lib/                  # Client API wrapper, token handler (gắn JWT + auto refresh)
│   ├── Dockerfile            # Multi-stage build (Node 20-alpine, output: 'standalone')
│   └── package.json
├── docker-compose.yml        # Orchestration cho local development (Postgres, MinIO, Backend, Frontend)
├── docker-compose.prod.yml   # Orchestration cho production (tích hợp thêm Nginx reverse proxy)
└── PROGRESS.md               # File ghi nhật ký và cập nhật tiến độ tự động của AI Agent

```

---

## 3. KỊCH BẢN SQL SCHEMA CHI TIẾT (POSTGRESQL 16)

Dưới đây là kịch bản SQL khởi tạo toàn bộ 13 bảng thực thể và 4 mối quan hệ, tích hợp sẵn dữ liệu mẫu (seed data) cho phân quyền RBAC và tài khoản đăng nhập mặc định:

```sql
-- ====================================================================
-- 1. ENUMS & KHỞI TẠO ĐẶC TẢ SỐ LIỆU NGHIỆP VỤ
-- ====================================================================
CREATE TYPE trang_thai_ho_so AS ENUM (
    'DANG_LUU_KHO', 'DA_DAT_GIU', 'DANG_CHO_DUYET_MUON', 'DANG_CHO_TRA', 'DA_MUON', 'DA_TIEU_HUY'
);
CREATE TYPE muc_do_mat AS ENUM ('COMMON', 'CONFIDENTIAL');
CREATE TYPE trang_thai_phieu_muon AS ENUM ('CHO_DUYET', 'DA_DUYET', 'TU_CHOI', 'DANG_MUON', 'DA_TRA', 'QUA_HAN');
CREATE TYPE trang_thai_tieu_huy AS ENUM ('DU_THAO', 'CHO_DUYET', 'DA_DUYET', 'DA_THUC_HIEN');

-- ====================================================================
-- 2. PHÂN HỆ 1: QUẢN TRỊ HỆ THỐNG (AUTH & RBAC)
-- ====================================================================
CREATE TABLE quyen (
    id VARCHAR(50) PRIMARY KEY,
    ten_quyen VARCHAR(100) NOT NULL,
    mo_ta TEXT
);

CREATE TABLE vai_tro (
    id VARCHAR(50) PRIMARY KEY,
    ten_vai_tro VARCHAR(100) NOT NULL,
    mo_ta TEXT
);

CREATE TABLE vai_tro_quyen (
    vai_tro_id VARCHAR(50) REFERENCES vai_tro(id) ON DELETE CASCADE,
    quyen_id VARCHAR(50) REFERENCES quyen(id) ON DELETE CASCADE,
    PRIMARY KEY (vai_tro_id, quyen_id)
);

CREATE TABLE tai_khoan (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    vai_tro_id VARCHAR(50) REFERENCES vai_tro(id),
    trang_thai BOOLEAN DEFAULT TRUE,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nhat_ky_he_thong (
    id BIGSERIAL PRIMARY KEY,
    tai_khoan_id BIGINT REFERENCES tai_khoan(id) ON DELETE SET NULL,
    hanh_dong VARCHAR(255) NOT NULL,
    chi_tiet TEXT,
    ip_address VARCHAR(45),
    ngay_thuc_hien TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tham_so_he_thong (
    ma_tham_so VARCHAR(50) PRIMARY KEY,
    gia_tri TEXT NOT NULL,
    mo_ta TEXT,
    kieu_du_lieu VARCHAR(20) DEFAULT 'STRING'
);

-- ====================================================================
-- 3. PHÂN HỆ 2: QUẢN LÝ HỒ SƠ & TÀI LIỆU
-- ====================================================================
CREATE TABLE danh_muc_loai_ho_so (
    id BIGSERIAL PRIMARY KEY,
    ten_loai VARCHAR(150) NOT NULL,
    thoi_han_bao_quan_nam INT NOT NULL, -- Số năm lưu trữ trước khi xem xét tiêu hủy
    mo_ta TEXT
);

CREATE TABLE vi_tri_luu_tru (
    id BIGSERIAL PRIMARY KEY,
    phong_kho VARCHAR(50) NOT NULL,     -- Ví dụ: Kho A, Kho B
    ke_hang VARCHAR(50) NOT NULL,        -- Ví dụ: Kệ 01
    ngan_chua VARCHAR(50) NOT NULL,      -- Ví dụ: Ngăn 03
    ma_dinh_danh_vi_tri VARCHAR(150) UNIQUE NOT NULL, -- Định dạng: KhoA-Ke01-Ngan03
    mo_ta TEXT
);

CREATE TABLE ho_so (
    id BIGSERIAL PRIMARY KEY,
    ma_ho_so VARCHAR(50) UNIQUE NOT NULL,
    ten_ho_so VARCHAR(255) NOT NULL,
    danh_muc_id BIGINT REFERENCES danh_muc_loai_ho_so(id),
    vi_tri_id BIGINT REFERENCES vi_tri_luu_tru(id),
    ngay_lap DATE NOT NULL DEFAULT CURRENT_DATE,
    thoi_han_bao_quan_den DATE,
    trang_thai trang_thai_ho_so DEFAULT 'DANG_LUU_KHO',
    muc_do_mat muc_do_mat DEFAULT 'COMMON',
    qr_active BOOLEAN DEFAULT TRUE,
    nguoi_tao_id BIGINT REFERENCES tai_khoan(id)
);

CREATE TABLE tai_lieu_so_hoa (
    id BIGSERIAL PRIMARY KEY,
    ho_so_id BIGINT REFERENCES ho_so(id) ON DELETE CASCADE,
    ten_tai_lieu VARCHAR(255) NOT NULL,
    duong_dan_file VARCHAR(512) NOT NULL, -- Đường dẫn tương đối lưu ở MinIO
    checksum VARCHAR(64),
    kich_thuoc BIGINT,
    dinh_dang_file VARCHAR(10),
    ngay_tai_len TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lich_su_trang_thai (
    id BIGSERIAL PRIMARY KEY,
    ho_so_id BIGINT REFERENCES ho_so(id) ON DELETE CASCADE,
    trang_thai_truoc trang_thai_ho_so,
    trang_thai_sau trang_thai_ho_so NOT NULL,
    ghi_chu TEXT,
    nguoi_thuc_hien_id BIGINT REFERENCES tai_khoan(id),
    ngay_cap_nhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- 4. PHÂN HỆ 3: QUẢN LÝ KHAI THÁC & TIÊU HỦY
-- ====================================================================
CREATE TABLE phieu_muon (
    id BIGSERIAL PRIMARY KEY,
    ho_so_id BIGINT REFERENCES ho_so(id),
    nguoi_muon_id BIGINT REFERENCES tai_khoan(id),
    nguoi_duyet_id BIGINT REFERENCES tai_khoan(id),
    ngay_yeu_cau TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_hen_tra DATE NOT NULL,
    ngay_muon_thuc_te TIMESTAMP,
    ngay_tra_thuc_te TIMESTAMP,
    trang_thai trang_thai_phieu_muon DEFAULT 'CHO_DUYET',
    ly_do_muon TEXT,
    ghi_chu TEXT
);

CREATE TABLE de_xuat_tieu_huy (
    id BIGSERIAL PRIMARY KEY,
    ma_de_xuat VARCHAR(50) UNIQUE NOT NULL,
    nguoi_tao_id BIGINT REFERENCES tai_khoan(id),
    nguoi_duyet_id BIGINT REFERENCES tai_khoan(id),
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_duyet TIMESTAMP,
    trang_thai trang_thai_tieu_huy DEFAULT 'DU_THAO',
    ly_do_tieu_huy TEXT
);

CREATE TABLE chi_tiet_tieu_huy (
    de_xuat_id BIGINT REFERENCES de_xuat_tieu_huy(id) ON DELETE CASCADE,
    ho_so_id BIGINT REFERENCES ho_so(id),
    PRIMARY KEY (de_xuat_id, ho_so_id)
);

-- ====================================================================
-- 5. SEED DỮ LIỆU BAN ĐẦU (ROLES & ACCOUNTS)
-- ====================================================================
-- Tạo danh sách các quyền cơ bản
INSERT INTO quyen (id, ten_quyen, mo_ta) VALUES
('SYS_ADMIN', 'Quản trị hệ thống', 'Toàn quyền cấu hình tài khoản và phân quyền'),
('RECORDS_MANAGE', 'Quản lý hồ sơ', 'Tạo mới, upload tài liệu số hóa, quản lý vị trí lưu kho'),
('LOAN_REQUEST', 'Đăng ký mượn', 'Gửi phiếu yêu cầu mượn hồ sơ giấy'),
('LOAN_MANAGE', 'Duyệt mượn trả', 'Xử lý yêu cầu mượn, xác nhận trả hồ sơ'),
('REPORT_VIEW', 'Xem báo cáo', 'Xem báo cáo kiểm kê, mượn trả và tiêu hủy');

-- Tạo các vai trò tương ứng với actors hệ thống
INSERT INTO vai_tro (id, ten_vai_tro, mo_ta) VALUES
('ADMIN', 'Quản trị viên', 'Quản trị toàn bộ hệ thống'),
('RECORDS_OFFICER', 'Cán bộ văn thư', 'Phụ trách lưu trữ, số hóa, duyệt mượn trả và tiêu hủy'),
('TEACHER', 'Giáo viên / Cán bộ', 'Mượn hồ sơ bản cứng, xem tài liệu số hóa thông thường');

-- Gán quyền cho vai trò
INSERT INTO vai_tro_quyen (vai_tro_id, quyen_id) VALUES
('ADMIN', 'SYS_ADMIN'), ('ADMIN', 'RECORDS_MANAGE'), ('ADMIN', 'LOAN_MANAGE'), ('ADMIN', 'REPORT_VIEW'),
('RECORDS_OFFICER', 'RECORDS_MANAGE'), ('RECORDS_OFFICER', 'LOAN_MANAGE'), ('RECORDS_OFFICER', 'LOAN_REQUEST'), ('RECORDS_OFFICER', 'REPORT_VIEW'),
('TEACHER', 'LOAN_REQUEST');

-- Tạo tài khoản mặc định (Mật khẩu được mã hóa BCrypt: 'password')
INSERT INTO tai_khoan (username, password, ho_ten, email, vai_tro_id, trang_thai) VALUES
('admin', '$2b$12$WBs7EH2Cw2R0m/qlSHQABerQ3Vq0c6SaASsmPW8REwNBsGfxKXDMW', 'Quản trị viên hệ thống', 'admin@school.edu.vn', 'ADMIN', TRUE),
('vanthu', '$2b$12$WBs7EH2Cw2R0m/qlSHQABerQ3Vq0c6SaASsmPW8REwNBsGfxKXDMW', 'Nguyễn Thị Văn Thư', 'vanthu@school.edu.vn', 'RECORDS_OFFICER', TRUE),
('giaovien', '$2b$12$WBs7EH2Cw2R0m/qlSHQABerQ3Vq0c6SaASsmPW8REwNBsGfxKXDMW', 'Trần Văn Giáo Viên', 'giaovien@school.edu.vn', 'TEACHER', TRUE);

```

---

## 4. ROADMAP CHI TIẾT 6 TUẦN (INSTRUCTIONS CHO AI CODING AGENT)

*Agent cần tạo file `PROGRESS.md` ở thư mục gốc và tự động cập nhật tiến độ (Ví dụ: `[x]` hoàn thành, `[-]` đang thực hiện, `[ ]` chưa làm) dựa trên bảng phân rã đầu việc dưới đây:*

| Tuần | Mục tiêu chính | Chi tiết đầu việc kỹ thuật cần hoàn thành | Sản phẩm bàn giao (Deliverable) |
| --- | --- | --- | --- |
| **Tuần 1** | **Scaffolding & Infrastructure** | - Khởi tạo cấu trúc monorepo (`backend/` và `frontend/`).<br>

<br>- Setup cấu hình Spring Boot 3.x ban đầu, tích hợp Flyway Migration nạp mã SQL ở trên.<br>

<br>- Setup Next.js 14+ skeleton, Tailwind CSS, TanStack Query và API client wrapper.<br>

<br>- Viết file `docker-compose.yml` định nghĩa PostgreSQL 16 và MinIO local. | Khởi chạy thành công toàn bộ hệ thống thô (`docker compose up --build`), DB và Storage local sẵn sàng hoạt động. |
| **Tuần 2** | **Xác thực & Quản trị (Auth/RBAC)** | - Hiện thực hóa Security layer với JWT (Đăng nhập -> Trả Access Token ngắn ở body + Refresh Token lưu ở httpOnly Cookie).<br>

<br>- Triển khai các API quản trị Tài khoản, Vai trò và phân Quyền (RBAC).<br>

<br>- Viết `AuditService` tự động bắt và ghi nhận logs thao tác vào bảng `nhat_ky_he_thong`.<br>

<br>- Làm màn hình Login và trang CRUD tài khoản trên Next.js. | Đăng nhập phân quyền thực tế hoạt động trơn tru, lưu vết lịch sử hệ thống chuẩn xác. |
| **Tuần 3** | **Quản lý Kho hồ sơ & Số hóa** | - Viết API CRUD quản lý Danh mục hồ sơ, Vị trí lưu kho (Kho, Kệ, Ngăn).<br>

<br>- Kết nối và cấu hình MinIO S3-compatible Client trên Spring Boot.<br>

<br>- Triển khai API upload tài liệu số hóa, lưu file lên MinIO, tự tính Checksum và ghi nhận thông tin vào bảng `tai_lieu_so_hoa`.<br>

<br>- Code giao diện khai báo Hồ sơ, gán vị trí lưu kho vật lý và tải lên file scan trực quan. | Đăng tải thành công các tệp scan (PDF, hình ảnh) của hồ sơ lên MinIO và lưu vết DB. |
| **Tuần 4** | **Mã QR & Nghiệp vụ Mượn/Trả** | - Viết `QrCodeService` tự động sinh ảnh QR chứa thông tin mã hồ sơ và vị trí đ�## 5. TIẾN ĐỘ DỰ ÁN THỰC TẾ & CODE ĐÃ TRIỂN KHAI

### 5.1 Cấu Trúc File Thực Tế Đã Triển Khai
```text
school-records-monorepo/
├── docker-compose.yml        # Định nghĩa các service DB, MinIO, Backend và Frontend
├── PROGRESS.md               # Nhật ký tiến độ 6 tuần của dự án
├── backend/
│   ├── pom.xml               # Quản lý dependency (thêm Spring Security & JWT)
│   ├── Dockerfile            # Multi-stage Docker build
│   └── src/main/
│       ├── java/com/school/records/
│       │   ├── RecordsApplication.java           # Entrypoint chính
│       │   ├── config/
│       │   │   └── WebConfig.java                # CORS Config
│       │   ├── security/
│       │   │   ├── JwtService.java               # Cấp phát & giải mã token JWT
│       │   │   ├── JwtAuthenticationFilter.java  # Bộ lọc xác thực Header Bearer
│       │   │   ├── CustomUserDetailsService.java # Load tài khoản từ Database
│       │   │   └── SecurityConfig.java           # Cấu hình Spring Security (Stateless, Password Encoder)
│       │   └── modules/admin/
│       │       ├── entity/
│       │       │   ├── Quyen.java, VaiTro.java, TaiKhoan.java, NhatKyHeThong.java  # JPA Entities
│       │       │   └── ...
│       │       ├── repository/
│       │       │   ├── QuyenRepository.java, VaiTroRepository.java                 # Repositories
│       │       │   ├── TaiKhoanRepository.java, NhatKyHeThongRepository.java
│       │       │   └── ...
│       │       ├── service/
│       │       │   └── AuditService.java         # Ghi nhận log hoạt động vào DB
│       │       └── controller/
│       │           ├── HealthController.java     # Endpoint health check
│       │           ├── AuthController.java       # Các API /login, /refresh, /logout, /me
│       │           └── UserController.java       # Các API CRUD tài khoản (/admin/users)
│       └── resources/
│           ├── application.yml
│           └── db/migration/
│               └── V1__initial_schema.sql        # Migration nạp schema & data mẫu (sửa mã hóa mật khẩu)
├── frontend/
│   ├── package.json
│   ├── next.config.ts
│   ├── Dockerfile
│   └── src/
│       ├── components/
│       │   ├── providers.tsx
│       │   └── auth-context.tsx  # AuthProvider lưu trữ Session State & Auto Refresh
│       ├── lib/
│       │   ├── api.ts            # Client API wrapper tự động chặn 401 & đính kèm Token Bearer
│       │   └── token.ts          # Lưu trữ Access Token tạm thời trong memory bảo mật
│       └── app/
│           ├── globals.css       # Biến màu, phông chữ, biểu tượng từ thiết kế Stitch
│           ├── layout.tsx
│           ├── page.tsx          # Root redirect loading wrapper
│           ├── login/
│           │   └── page.tsx      # Giao diện Login với Stitch card, eye-toggle
│           └── dashboard/
│               ├── layout.tsx    # Giao diện khung chứa sidebar & user status profile
│               ├── page.tsx      # Giao diện trang chủ Dashboard với số liệu thống kê sinh động
│               └── users/
│                   └── page.tsx  # Giao diện quản trị tài khoản (CRUD, status switch, modals)
```

### 5.2 Nhật Ký Kiểm Thử (Testing & Verification Report - Week 1)
1. **Khởi chạy container thành công**:
   - Sử dụng lệnh `docker compose up --build -d` khởi chạy thành công 4 container.
2. **API Health check và Kết nối Database**:
   - Khi gọi trực tiếp endpoint `/api/health` trả về kết quả `UP` và kết nối thành công.

### 5.3 Nhật Ký Kiểm Thử (Testing & Verification Report - Week 2)
1. **Xác thực JWT & Quản lý Session**:
   - Đăng nhập thành công trả về `accessToken` ở Response Body và thiết lập `refreshToken` trong HTTP-Only cookie.
   - Khi token hết hạn (401 Unauthorized), Client API tự động gọi `/api/auth/refresh` lấy token mới và thực hiện lại tác vụ mà người dùng không nhận ra.
   - Nút "Đăng xuất" xóa cookie và dọn sạch session trong bộ nhớ an toàn.
2. **Phân quyền và Bảo mật đầu cuối**:
   - Các API quản trị trong `UserController` được bảo vệ bằng `@PreAuthorize("hasAuthority('SYS_ADMIN')")`. Người dùng có quyền giáo viên (`TEACHER`) không thể gọi hoặc truy cập trực tiếp trang Hệ thống.
3. **Ghi nhật ký hệ thống (Audit Logs)**:
   - Các hành động: Đăng nhập thành công (`DANG_NHAP`), Đăng nhập thất bại (`DANG_NHAP_THAT_BAI`), Khóa tài khoản (`KHOA_TAI_KHOAN`), Mở khóa tài khoản (`MO_KHOA_TAI_KHOAN`), Tạo tài khoản (`TAO_TAI_KHOAN`), Đăng xuất (`DANG_XUAT`) đều được tự động lưu lại vào bảng `nhat_ky_he_thong` lưu trữ đầy đủ chi tiết lỗi và IP.
4. **Kiểm thử E2E Giao diện**:
   - Kiểm thử tự động bằng Browser Agent xác nhận:
     - Truy cập `/` chưa đăng nhập -> Tự động redirect về `/login`.
     - Đăng nhập `admin` / `password` -> Redirect vào `/dashboard`.
     - Vào trang người dùng -> Tạo thành công user `testteacher` với vai trò `TEACHER`.
     - Chuyển trạng thái bật/tắt (Toggle) -> Cập nhật trạng thái tức thời lên database và ghi nhận log chính xác.
     - Đăng xuất và đăng nhập lại bằng tài khoản mới tạo thành công.�─ Dockerfile            # Multi-stage Docker build tối ưu cho Next.js standalone runner
│   └── src/
│       ├── components/
│       │   └── providers.tsx # Cấu hình QueryClientProvider của TanStack Query
│       ├── lib/
│       │   └── api.ts        # API client wrapper dùng fetch hỗ trợ serialize tham số truy vấn
│       └── app/
│           ├── layout.tsx    # Layout chính cấu hình SEO (Title/Meta Description) & Providers
│           └── page.tsx      # Dashboard trực quan kiểm tra trạng thái sức khỏe của hệ thống
```

### 5.2 Nhật Ký Kiểm Thử (Testing & Verification Report)
1. **Khởi chạy container thành công**:
   - Sử dụng lệnh `docker compose up --build -d` khởi chạy thành công 4 container:
     - `school-records-db`: PostgreSQL 16 (Port 5432)
     - `school-records-minio`: MinIO (Port 9000-9001)
     - `school-records-backend`: Spring Boot (Port 8080)
     - `school-records-frontend`: Next.js (Port 3000)
2. **Flyway Migration & Seed Data**:
   - Log của backend xác nhận Flyway đã chạy schema lịch sử thành công và áp dụng script `V1__initial_schema.sql`.
   - Cơ sở dữ liệu Postgres tự động tạo ra 13 bảng nghiệp vụ, enums và seed sẵn 3 tài khoản mặc định đại diện cho 3 vai trò: `ADMIN`, `RECORDS_OFFICER`, và `TEACHER`.
3. **API Health check và Kết nối Database**:
   - Khi gọi trực tiếp endpoint `/api/health` trả về kết quả:
     ```json
     {
       "roles_seeded": 3,
       "database": "CONNECTED",
       "status": "UP"
     }
     ```
4. **Kiểm thử Giao diện (Next.js Dashboard + CORS)**:
   - Giao diện Next.js tải tại `http://localhost:3000` hiển thị bảng điều khiển Dark-mode trực quan và sắc nét, được làm đẹp với bộ icon của Lucide.
   - Ban đầu, Browser chặn fetch client-side do chính sách CORS.
   - Khắc phục thành công bằng cách tạo lớp cấu hình `WebConfig.java` ở Spring Boot, kích hoạt CORS cho nguồn gốc `http://localhost:3000`.
   - Kết quả: Nút "Làm mới" (Refresh) hoạt động hoàn hảo, giao diện lấy được đúng dữ liệu `/health` thời gian thực và hiển thị trạng thái của DB là `CONNECTED` cùng số lượng role là `3`.





