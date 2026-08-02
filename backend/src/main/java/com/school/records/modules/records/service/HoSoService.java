package com.school.records.modules.records.service;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.records.entity.*;
import com.school.records.modules.records.repository.DanhMucLoaiHoSoRepository;
import com.school.records.modules.records.repository.HoSoRepository;
import com.school.records.modules.records.repository.ViTriLuuTruRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class HoSoService {

    @Autowired
    private HoSoRepository hoSoRepository;

    @Autowired
    private DanhMucLoaiHoSoRepository danhMucRepository;

    @Autowired
    private ViTriLuuTruRepository viTriRepository;

    @Autowired
    private ViTriLuuTruService viTriLuuTruService;

    public Page<HoSo> searchHoSo(String query, Long danhMucId, TrangThaiHoSo trangThai, Pageable pageable) {
        Specification<HoSo> spec = (root, q, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate matchMa = cb.like(cb.lower(root.get("maHoSo")), pattern);
                Predicate matchTen = cb.like(cb.lower(root.get("tenHoSo")), pattern);
                predicates.add(cb.or(matchMa, matchTen));
            }

            if (danhMucId != null) {
                predicates.add(cb.equal(root.get("danhMuc").get("id"), danhMucId));
            }

            if (trangThai != null) {
                predicates.add(cb.equal(root.get("trangThai"), trangThai));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return hoSoRepository.findAll(spec, pageable);
    }

    public HoSo getById(Long id) {
        return hoSoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ với id: " + id));
    }

    @Transactional
    public HoSo createHoSo(CreateHoSoRequest request, TaiKhoan nguoiTao) {
        DanhMucLoaiHoSo danhMuc = null;
        if (request.getDanhMucId() != null) {
            danhMuc = danhMucRepository.findById(request.getDanhMucId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục loại hồ sơ: " + request.getDanhMucId()));
        }

        ViTriLuuTru viTri = null;
        if (request.getPhongKho() != null && !request.getPhongKho().trim().isEmpty() &&
            request.getKeHang() != null && !request.getKeHang().trim().isEmpty() &&
            request.getNganChua() != null && !request.getNganChua().trim().isEmpty()) {
            viTri = viTriLuuTruService.findOrCreate(request.getPhongKho(), request.getKeHang(), request.getNganChua());
        } else if (request.getViTriId() != null) {
            viTri = viTriRepository.findById(request.getViTriId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vị trí lưu trữ: " + request.getViTriId()));
        }

        String maHoSo = request.getMaHoSo();
        if (maHoSo == null || maHoSo.trim().isEmpty()) {
            maHoSo = generateMaHoSo();
        } else if (hoSoRepository.existsByMaHoSo(maHoSo.trim())) {
            throw new IllegalArgumentException("Mã hồ sơ đã tồn tại: " + maHoSo);
        }

        LocalDate ngayLap = request.getNgayLap() != null ? request.getNgayLap() : LocalDate.now();
        LocalDate thoiHanBaoQuanDen = calculateThoiHanBaoQuanDen(
                ngayLap,
                request.getThoiHanBaoQuanThang(),
                request.getThoiHanBaoQuanNgay(),
                request.getThoiHanBaoQuanDen(),
                danhMuc
        );

        HoSo hoSo = HoSo.builder()
                .maHoSo(maHoSo)
                .tenHoSo(request.getTenHoSo())
                .danhMuc(danhMuc)
                .viTri(viTri)
                .ngayLap(ngayLap)
                .thoiHanBaoQuanDen(thoiHanBaoQuanDen)
                .trangThai(request.getTrangThai() != null ? request.getTrangThai() : TrangThaiHoSo.DANG_LUU_KHO)
                .mucDoMat(request.getMucDoMat() != null ? request.getMucDoMat() : MucDoMat.COMMON)
                .qrActive(true)
                .nguoiTao(nguoiTao)
                .build();

        return hoSoRepository.save(hoSo);
    }

    private LocalDate calculateThoiHanBaoQuanDen(
            LocalDate ngayLap,
            Integer thoiHanThang,
            Integer thoiHanNgay,
            LocalDate denDirect,
            DanhMucLoaiHoSo danhMuc
    ) {
        if (denDirect != null) {
            return denDirect;
        }
        if (ngayLap == null) {
            ngayLap = LocalDate.now();
        }
        if (thoiHanThang != null && thoiHanThang > 0) {
            return ngayLap.plusMonths(thoiHanThang);
        }
        if (thoiHanNgay != null && thoiHanNgay > 0) {
            return ngayLap.plusDays(thoiHanNgay);
        }
        if (danhMuc != null && danhMuc.getThoiHanBaoQuanNam() != null) {
            String unit = danhMuc.getDonViThoiHan();
            if ("THANG".equalsIgnoreCase(unit)) {
                return ngayLap.plusMonths(danhMuc.getThoiHanBaoQuanNam());
            } else if ("NGAY".equalsIgnoreCase(unit)) {
                return ngayLap.plusDays(danhMuc.getThoiHanBaoQuanNam());
            } else {
                return ngayLap.plusYears(danhMuc.getThoiHanBaoQuanNam());
            }
        }
        return null;
    }

    @Transactional
    public HoSo updateHoSo(Long id, UpdateHoSoRequest request) {
        HoSo existing = getById(id);

        if (request.getTenHoSo() != null) {
            existing.setTenHoSo(request.getTenHoSo());
        }

        if (request.getNgayLap() != null) {
            existing.setNgayLap(request.getNgayLap());
        }

        if (request.getDanhMucId() != null) {
            DanhMucLoaiHoSo danhMuc = danhMucRepository.findById(request.getDanhMucId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục loại hồ sơ: " + request.getDanhMucId()));
            existing.setDanhMuc(danhMuc);
        }

        // Recalculate thoiHanBaoQuanDen if any option provided
        if (request.getThoiHanBaoQuanDen() != null ||
            request.getThoiHanBaoQuanThang() != null ||
            request.getThoiHanBaoQuanNgay() != null ||
            request.getNgayLap() != null ||
            request.getDanhMucId() != null) {

            LocalDate calculated = calculateThoiHanBaoQuanDen(
                    existing.getNgayLap(),
                    request.getThoiHanBaoQuanThang(),
                    request.getThoiHanBaoQuanNgay(),
                    request.getThoiHanBaoQuanDen(),
                    existing.getDanhMuc()
            );
            if (calculated != null) {
                existing.setThoiHanBaoQuanDen(calculated);
            }
        }

        if (request.getPhongKho() != null && !request.getPhongKho().trim().isEmpty() &&
            request.getKeHang() != null && !request.getKeHang().trim().isEmpty() &&
            request.getNganChua() != null && !request.getNganChua().trim().isEmpty()) {
            ViTriLuuTru viTri = viTriLuuTruService.findOrCreate(request.getPhongKho(), request.getKeHang(), request.getNganChua());
            existing.setViTri(viTri);
        } else if (request.getViTriId() != null) {
            ViTriLuuTru viTri = viTriRepository.findById(request.getViTriId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vị trí lưu trữ: " + request.getViTriId()));
            existing.setViTri(viTri);
        }

        if (request.getTrangThai() != null) {
            existing.setTrangThai(request.getTrangThai());
        }

        if (request.getMucDoMat() != null) {
            existing.setMucDoMat(request.getMucDoMat());
        }

        return hoSoRepository.save(existing);
    }

    @Transactional
    public void deleteHoSo(Long id) {
        HoSo existing = getById(id);
        hoSoRepository.delete(existing);
    }

    private String generateMaHoSo() {
        String prefix = "HS-" + LocalDate.now().getYear();
        String suffix = Long.toHexString(System.currentTimeMillis() % 0xFFFF).toUpperCase();
        return prefix + "-" + String.format("%4s", suffix).replace(' ', '0');
    }

    public static class CreateHoSoRequest {
        private String maHoSo;
        private String tenHoSo;
        private Long danhMucId;
        private Long viTriId;
        private String phongKho;
        private String keHang;
        private String nganChua;
        private LocalDate ngayLap;
        private Integer thoiHanBaoQuanThang;
        private Integer thoiHanBaoQuanNgay;
        private LocalDate thoiHanBaoQuanDen;
        private TrangThaiHoSo trangThai;
        private MucDoMat mucDoMat;

        public String getMaHoSo() { return maHoSo; }
        public void setMaHoSo(String maHoSo) { this.maHoSo = maHoSo; }

        public String getTenHoSo() { return tenHoSo; }
        public void setTenHoSo(String tenHoSo) { this.tenHoSo = tenHoSo; }

        public Long getDanhMucId() { return danhMucId; }
        public void setDanhMucId(Long danhMucId) { this.danhMucId = danhMucId; }

        public Long getViTriId() { return viTriId; }
        public void setViTriId(Long viTriId) { this.viTriId = viTriId; }

        public String getPhongKho() { return phongKho; }
        public void setPhongKho(String phongKho) { this.phongKho = phongKho; }

        public String getKeHang() { return keHang; }
        public void setKeHang(String keHang) { this.keHang = keHang; }

        public String getNganChua() { return nganChua; }
        public void setNganChua(String nganChua) { this.nganChua = nganChua; }

        public LocalDate getNgayLap() { return ngayLap; }
        public void setNgayLap(LocalDate ngayLap) { this.ngayLap = ngayLap; }

        public Integer getThoiHanBaoQuanThang() { return thoiHanBaoQuanThang; }
        public void setThoiHanBaoQuanThang(Integer thoiHanBaoQuanThang) { this.thoiHanBaoQuanThang = thoiHanBaoQuanThang; }

        public Integer getThoiHanBaoQuanNgay() { return thoiHanBaoQuanNgay; }
        public void setThoiHanBaoQuanNgay(Integer thoiHanBaoQuanNgay) { this.thoiHanBaoQuanNgay = thoiHanBaoQuanNgay; }

        public LocalDate getThoiHanBaoQuanDen() { return thoiHanBaoQuanDen; }
        public void setThoiHanBaoQuanDen(LocalDate thoiHanBaoQuanDen) { this.thoiHanBaoQuanDen = thoiHanBaoQuanDen; }

        public TrangThaiHoSo getTrangThai() { return trangThai; }
        public void setTrangThai(TrangThaiHoSo trangThai) { this.trangThai = trangThai; }

        public MucDoMat getMucDoMat() { return mucDoMat; }
        public void setMucDoMat(MucDoMat mucDoMat) { this.mucDoMat = mucDoMat; }
    }

    public static class UpdateHoSoRequest {
        private String tenHoSo;
        private Long danhMucId;
        private Long viTriId;
        private String phongKho;
        private String keHang;
        private String nganChua;
        private LocalDate ngayLap;
        private Integer thoiHanBaoQuanThang;
        private Integer thoiHanBaoQuanNgay;
        private LocalDate thoiHanBaoQuanDen;
        private TrangThaiHoSo trangThai;
        private MucDoMat mucDoMat;

        public String getTenHoSo() { return tenHoSo; }
        public void setTenHoSo(String tenHoSo) { this.tenHoSo = tenHoSo; }

        public Long getDanhMucId() { return danhMucId; }
        public void setDanhMucId(Long danhMucId) { this.danhMucId = danhMucId; }

        public Long getViTriId() { return viTriId; }
        public void setViTriId(Long viTriId) { this.viTriId = viTriId; }

        public String getPhongKho() { return phongKho; }
        public void setPhongKho(String phongKho) { this.phongKho = phongKho; }

        public String getKeHang() { return keHang; }
        public void setKeHang(String keHang) { this.keHang = keHang; }

        public String getNganChua() { return nganChua; }
        public void setNganChua(String nganChua) { this.nganChua = nganChua; }

        public LocalDate getNgayLap() { return ngayLap; }
        public void setNgayLap(LocalDate ngayLap) { this.ngayLap = ngayLap; }

        public Integer getThoiHanBaoQuanThang() { return thoiHanBaoQuanThang; }
        public void setThoiHanBaoQuanThang(Integer thoiHanBaoQuanThang) { this.thoiHanBaoQuanThang = thoiHanBaoQuanThang; }

        public Integer getThoiHanBaoQuanNgay() { return thoiHanBaoQuanNgay; }
        public void setThoiHanBaoQuanNgay(Integer thoiHanBaoQuanNgay) { this.thoiHanBaoQuanNgay = thoiHanBaoQuanNgay; }

        public LocalDate getThoiHanBaoQuanDen() { return thoiHanBaoQuanDen; }
        public void setThoiHanBaoQuanDen(LocalDate thoiHanBaoQuanDen) { this.thoiHanBaoQuanDen = thoiHanBaoQuanDen; }

        public TrangThaiHoSo getTrangThai() { return trangThai; }
        public void setTrangThai(TrangThaiHoSo trangThai) { this.trangThai = trangThai; }

        public MucDoMat getMucDoMat() { return mucDoMat; }
        public void setMucDoMat(MucDoMat mucDoMat) { this.mucDoMat = mucDoMat; }
    }
}
