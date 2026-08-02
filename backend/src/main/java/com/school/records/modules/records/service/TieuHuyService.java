package com.school.records.modules.records.service;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.repository.TaiKhoanRepository;
import com.school.records.modules.records.entity.DeXuatTieuHuy;
import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.TrangThaiHoSo;
import com.school.records.modules.records.enums.TrangThaiTieuHuy;
import com.school.records.modules.records.repository.DeXuatTieuHuyRepository;
import com.school.records.modules.records.repository.HoSoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TieuHuyService {

    @Autowired
    private DeXuatTieuHuyRepository deXuatTieuHuyRepository;

    @Autowired
    private HoSoRepository hoSoRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    public List<HoSo> getEligibleRecords() {
        return hoSoRepository.findByThoiHanBaoQuanDenBeforeAndTrangThai(
                LocalDate.now(),
                TrangThaiHoSo.DANG_LUU_KHO
        );
    }

    public Page<DeXuatTieuHuy> getAllDeXuat(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return deXuatTieuHuyRepository.findAll(pageable);
    }

    public DeXuatTieuHuy getDeXuatById(Long id) {
        return deXuatTieuHuyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đề xuất tiêu hủy ID: " + id));
    }

    @Transactional
    public DeXuatTieuHuy createDeXuat(String lyDoTieuHuy, List<Long> hoSoIds, String username) {
        TaiKhoan nguoiTao = taiKhoanRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng: " + username));

        List<HoSo> hoSoList = hoSoRepository.findAllById(hoSoIds);
        if (hoSoList.isEmpty()) {
            throw new IllegalArgumentException("Danh sách hồ sơ không hợp lệ hoặc trống");
        }

        String maDeXuat = "DXTH-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        DeXuatTieuHuy deXuat = new DeXuatTieuHuy();
        deXuat.setMaDeXuat(maDeXuat);
        deXuat.setNguoiTao(nguoiTao);
        deXuat.setNgayTao(LocalDateTime.now());
        deXuat.setTrangThai(TrangThaiTieuHuy.DU_THAO);
        deXuat.setLyDoTieuHuy(lyDoTieuHuy);
        deXuat.setDanhSachHoSo(hoSoList);

        return deXuatTieuHuyRepository.save(deXuat);
    }

    @Transactional
    public DeXuatTieuHuy submitDeXuat(Long id) {
        DeXuatTieuHuy deXuat = getDeXuatById(id);
        if (deXuat.getTrangThai() != TrangThaiTieuHuy.DU_THAO) {
            throw new IllegalStateException("Đề xuất chỉ có thể trình duyệt từ trạng thái DỰ THẢO");
        }
        deXuat.setTrangThai(TrangThaiTieuHuy.CHO_DUYET);
        return deXuatTieuHuyRepository.save(deXuat);
    }

    @Transactional
    public DeXuatTieuHuy approveDeXuat(Long id, String usernameDuyet) {
        DeXuatTieuHuy deXuat = getDeXuatById(id);
        if (deXuat.getTrangThai() != TrangThaiTieuHuy.CHO_DUYET) {
            throw new IllegalStateException("Đề xuất chỉ có thể phê duyệt từ trạng thái CHỜ DUYỆT");
        }
        TaiKhoan nguoiDuyet = taiKhoanRepository.findByUsername(usernameDuyet).orElse(null);
        deXuat.setNguoiDuyet(nguoiDuyet);
        deXuat.setNgayDuyet(LocalDateTime.now());
        deXuat.setTrangThai(TrangThaiTieuHuy.DA_DUYET);
        return deXuatTieuHuyRepository.save(deXuat);
    }

    @Transactional
    public DeXuatTieuHuy executeDeXuat(Long id) {
        DeXuatTieuHuy deXuat = getDeXuatById(id);
        if (deXuat.getTrangThai() != TrangThaiTieuHuy.DA_DUYET) {
            throw new IllegalStateException("Chỉ có thể thực thi đề xuất ở trạng thái ĐÃ DUYỆT");
        }

        // Update all related records to DA_TIEU_HUY
        for (HoSo hoSo : deXuat.getDanhSachHoSo()) {
            hoSo.setTrangThai(TrangThaiHoSo.DA_TIEU_HUY);
            hoSoRepository.save(hoSo);
        }

        deXuat.setTrangThai(TrangThaiTieuHuy.DA_THUC_HIEN);
        return deXuatTieuHuyRepository.save(deXuat);
    }
}
