 # TIẾN ĐỘ DỰ ÁN (PROJECT PROGRESS)

Tài liệu này ghi lại tiến độ thực tế triển khai các hạng mục theo kế hoạch 6 tuần.

## DANH SÁCH CÁC HẠNG MỤC PHÁT TRIỂN

### **Tuần 1: Scaffolding & Infrastructure** `[x] HOÀN THÀNH`
- [x] Khởi tạo cấu trúc monorepo (`backend/` và `frontend/`).
- [x] Thiết lập cấu hình Spring Boot 3.x ban đầu, tích hợp Flyway Migration nạp mã SQL schema và seed data.
- [x] Thiết lập Next.js 14+ skeleton, Tailwind CSS, TanStack Query và API client wrapper.
- [x] Viết file `docker-compose.yml` định nghĩa PostgreSQL 16, MinIO, Backend và Frontend chạy local.
- [x] Xử lý CORS cấu hình kết nối trực tiếp frontend -> backend.
- [x] Chạy thử và xác nhận toàn bộ hệ thống thô hoạt động trơn tru.

---

### **Tuần 2: Xác thực & Quản trị (Auth/RBAC)** `[x] HOÀN THÀNH`
- [x] Hiện thực hóa Security layer với JWT (Đăng nhập -> Trả Access Token ngắn ở body + Refresh Token lưu ở httpOnly Cookie).
- [x] Triển khai các API quản trị Tài khoản, Vai trò và phân Quyền (RBAC).
- [x] Viết `AuditService` tự động bắt và ghi nhận logs thao tác vào bảng `nhat_ky_he_thong`.
- [x] Làm màn hình Login và trang CRUD tài khoản trên Next.js.

---

### **Tuần 3: Quản lý Kho hồ sơ & Số hóa** `[ ] CHƯA LÀM`
- [ ] Viết API CRUD quản lý Danh mục hồ sơ, Vị trí lưu kho (Kho, Kệ, Ngăn).
- [ ] Kết nối và cấu hình MinIO S3-compatible Client trên Spring Boot.
- [ ] Triển khai API upload tài liệu số hóa, lưu file lên MinIO, tự tính Checksum và ghi nhận thông tin vào bảng `tai_lieu_so_hoa`.
- [ ] Code giao diện khai báo Hồ sơ, gán vị trí lưu kho vật lý và tải lên file scan trực quan.

---

### **Tuần 4: Mã QR & Nghiệp vụ Mượn/Trả** `[ ] CHƯA LÀM`
- [ ] Viết `QrCodeService` tự động sinh ảnh QR chứa thông tin mã hồ sơ và vị trí để in dán.
- [ ] Triển khai hàm `MuonTraService.datGiuHoSo()` chuyển trạng thái hồ sơ sang `DA_DAT_GIU` ngay khi tạo yêu cầu.
- [ ] Xây dựng luồng phê duyệt mượn và xác nhận trả hồ sơ vật lý của Văn thư.
- [ ] Code giao diện quét mã QR/nhập mã tra cứu nhanh vị trí và trạng thái hồ sơ.

---

### **Tuần 5: Công việc nền & Báo cáo** `[ ] CHƯA LÀM`
- [ ] Viết Spring Boot `@Scheduled` định kỳ chạy hàng ngày quét phiếu mượn quá hạn để tự động đổi trạng thái và gửi cảnh báo.
- [ ] Viết nghiệp vụ lập Đề xuất tiêu hủy đối với các hồ sơ đã quá thời hạn bảo quản lưu kho.
- [ ] Xây dựng API tổng hợp báo cáo kiểm kê kho, thống kê tỷ lệ mượn trả.
- [ ] Làm giao diện Dashboard trực quan (biểu đồ thống kê đơn giản) cho Ban Giám Hiệu.

---

### **Tuần 6: Dockerization & Demo Polish** `[ ] CHƯA LÀM`
- [ ] Viết các multi-stage Dockerfile tối ưu kích thước ảnh (Backend sử dụng Alpine JRE, Frontend sử dụng Next.js standalone).
- [ ] Viết tệp `docker-compose.prod.yml` chạy bản hoàn thiện, tích hợp Nginx làm Reverse Proxy đứng trước cả 2 app.
- [ ] Thiết lập kiểm thử tích hợp tối giản (Smoke test, kiểm tra chặn xem tài liệu `CONFIDENTIAL` với tài khoản Teacher).
