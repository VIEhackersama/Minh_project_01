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
