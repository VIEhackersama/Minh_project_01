package com.school.records.modules.loans.service;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.repository.TaiKhoanRepository;
import com.school.records.modules.loans.entity.PhieuMuon;
import com.school.records.modules.loans.enums.TrangThaiPhieuMuon;
import com.school.records.modules.loans.repository.PhieuMuonRepository;
import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.TrangThaiHoSo;
import com.school.records.modules.records.repository.HoSoRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MuonTraService {

    @Autowired
    private PhieuMuonRepository phieuMuonRepository;

    @Autowired
    private HoSoRepository hoSoRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Transactional
    public PhieuMuon datGiuHoSo(Long hoSoId, String username, LocalDate ngayHenTra, String lyDoMuon) {
        HoSo hoSo = hoSoRepository.findById(hoSoId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ với id: " + hoSoId));

        if (hoSo.getTrangThai() != TrangThaiHoSo.DANG_LUU_KHO) {
            throw new IllegalStateException("Hồ sơ hiện không ở trạng thái khả dụng để mượn (Trạng thái hiện tại: " + hoSo.getTrangThai() + ")");
        }

        TaiKhoan nguoiMuon = taiKhoanRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản người mượn: " + username));

        // Update record status to DA_DAT_GIU immediately
        hoSo.setTrangThai(TrangThaiHoSo.DA_DAT_GIU);
        hoSoRepository.save(hoSo);

        PhieuMuon phieuMuon = PhieuMuon.builder()
                .hoSo(hoSo)
                .nguoiMuon(nguoiMuon)
                .ngayYeuCau(LocalDateTime.now())
                .ngayHenTra(ngayHenTra != null ? ngayHenTra : LocalDate.now().plusDays(7))
                .trangThai(TrangThaiPhieuMuon.CHO_DUYET)
                .lyDoMuon(lyDoMuon)
                .build();

        return phieuMuonRepository.save(phieuMuon);
    }

    @Transactional
    public PhieuMuon pheDuyetPhieuMuon(Long phieuMuonId, String usernameDuyet, boolean approve, String ghiChu) {
        PhieuMuon phieuMuon = phieuMuonRepository.findById(phieuMuonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phiếu mượn với id: " + phieuMuonId));

        if (phieuMuon.getTrangThai() != TrangThaiPhieuMuon.CHO_DUYET) {
            throw new IllegalStateException("Phiếu mượn không ở trạng thái chờ duyệt (Trạng thái: " + phieuMuon.getTrangThai() + ")");
        }

        TaiKhoan nguoiDuyet = taiKhoanRepository.findByUsername(usernameDuyet)
                .orElse(null);

        HoSo hoSo = phieuMuon.getHoSo();

        phieuMuon.setNguoiDuyet(nguoiDuyet);
        phieuMuon.setGhiChu(ghiChu);

        if (approve) {
            phieuMuon.setTrangThai(TrangThaiPhieuMuon.DANG_MUON);
            phieuMuon.setNgayMuonThucTe(LocalDateTime.now());
            if (hoSo != null) {
                hoSo.setTrangThai(TrangThaiHoSo.DA_MUON);
                hoSoRepository.save(hoSo);
            }
        } else {
            phieuMuon.setTrangThai(TrangThaiPhieuMuon.TU_CHOI);
            if (hoSo != null) {
                hoSo.setTrangThai(TrangThaiHoSo.DANG_LUU_KHO);
                hoSoRepository.save(hoSo);
            }
        }

        return phieuMuonRepository.save(phieuMuon);
    }

    @Transactional
    public PhieuMuon xacNhanTraHoSo(Long phieuMuonId, String usernameDuyet) {
        PhieuMuon phieuMuon = phieuMuonRepository.findById(phieuMuonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phiếu mượn với id: " + phieuMuonId));

        if (phieuMuon.getTrangThai() != TrangThaiPhieuMuon.DANG_MUON && phieuMuon.getTrangThai() != TrangThaiPhieuMuon.DA_DUYET && phieuMuon.getTrangThai() != TrangThaiPhieuMuon.QUA_HAN) {
            throw new IllegalStateException("Phiếu mượn không ở trạng thái đang mượn để trả");
        }

        phieuMuon.setTrangThai(TrangThaiPhieuMuon.DA_TRA);
        phieuMuon.setNgayTraThucTe(LocalDateTime.now());

        HoSo hoSo = phieuMuon.getHoSo();
        if (hoSo != null) {
            hoSo.setTrangThai(TrangThaiHoSo.DANG_LUU_KHO);
            hoSoRepository.save(hoSo);
        }

        return phieuMuonRepository.save(phieuMuon);
    }

    public Page<PhieuMuon> searchPhieuMuon(String query, String statusStr, String username, int page, int size) {
        Specification<PhieuMuon> spec = (root, q, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (query != null && !query.trim().isEmpty()) {
                String pattern = "%" + query.trim().toLowerCase() + "%";
                Predicate matchHoSoName = cb.like(cb.lower(root.get("hoSo").get("tenHoSo")), pattern);
                Predicate matchHoSoCode = cb.like(cb.lower(root.get("hoSo").get("maHoSo")), pattern);
                Predicate matchUser = cb.like(cb.lower(root.get("nguoiMuon").get("hoTen")), pattern);
                predicates.add(cb.or(matchHoSoName, matchHoSoCode, matchUser));
            }

            if (statusStr != null && !statusStr.trim().isEmpty() && !"ALL".equalsIgnoreCase(statusStr)) {
                try {
                    TrangThaiPhieuMuon status = TrangThaiPhieuMuon.valueOf(statusStr.toUpperCase());
                    predicates.add(cb.equal(root.get("trangThai"), status));
                } catch (Exception ignored) {}
            }

            if (username != null && !username.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("nguoiMuon").get("username"), username));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return phieuMuonRepository.findAll(spec, pageable);
    }
}
