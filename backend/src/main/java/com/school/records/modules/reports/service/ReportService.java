package com.school.records.modules.reports.service;

import com.school.records.modules.loans.enums.TrangThaiPhieuMuon;
import com.school.records.modules.loans.repository.PhieuMuonRepository;
import com.school.records.modules.records.entity.DanhMucLoaiHoSo;
import com.school.records.modules.records.entity.TrangThaiHoSo;
import com.school.records.modules.records.entity.ViTriLuuTru;
import com.school.records.modules.records.repository.DanhMucLoaiHoSoRepository;
import com.school.records.modules.records.repository.DeXuatTieuHuyRepository;
import com.school.records.modules.records.repository.HoSoRepository;
import com.school.records.modules.records.repository.ViTriLuuTruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ReportService {

    @Autowired
    private HoSoRepository hoSoRepository;

    @Autowired
    private PhieuMuonRepository phieuMuonRepository;

    @Autowired
    private DanhMucLoaiHoSoRepository danhMucRepository;

    @Autowired
    private ViTriLuuTruRepository viTriRepository;

    @Autowired
    private DeXuatTieuHuyRepository deXuatTieuHuyRepository;

    public Map<String, Object> getSummary() {
        long totalRecords = hoSoRepository.count();
        long storedRecords = hoSoRepository.countByTrangThai(TrangThaiHoSo.DANG_LUU_KHO);
        long borrowedRecords = hoSoRepository.countByTrangThai(TrangThaiHoSo.DA_MUON);
        long reservedRecords = hoSoRepository.countByTrangThai(TrangThaiHoSo.DA_DAT_GIU);
        long destroyedRecords = hoSoRepository.countByTrangThai(TrangThaiHoSo.DA_TIEU_HUY);

        long totalLoans = phieuMuonRepository.count();
        long activeLoans = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DANG_MUON);
        long overdueLoans = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.QUA_HAN);
        long pendingLoans = phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.CHO_DUYET);

        long eligibleDestruction = hoSoRepository.findByThoiHanBaoQuanDenBeforeAndTrangThai(
                LocalDate.now(),
                TrangThaiHoSo.DANG_LUU_KHO
        ).size();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRecords", totalRecords);
        summary.put("storedRecords", storedRecords);
        summary.put("borrowedRecords", borrowedRecords);
        summary.put("reservedRecords", reservedRecords);
        summary.put("destroyedRecords", destroyedRecords);

        summary.put("totalLoans", totalLoans);
        summary.put("activeLoans", activeLoans);
        summary.put("overdueLoans", overdueLoans);
        summary.put("pendingLoans", pendingLoans);
        summary.put("eligibleDestruction", eligibleDestruction);

        return summary;
    }

    public List<Map<String, Object>> getInventoryByCategory() {
        List<DanhMucLoaiHoSo> categories = danhMucRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (DanhMucLoaiHoSo cat : categories) {
            long count = hoSoRepository.countByDanhMucId(cat.getId());
            Map<String, Object> item = new HashMap<>();
            item.put("categoryId", cat.getId());
            item.put("categoryName", cat.getTenLoai());
            item.put("categoryCode", "DM-" + cat.getId());
            item.put("recordCount", count);
            result.add(item);
        }
        return result;
    }

    public List<Map<String, Object>> getInventoryByLocation() {
        List<ViTriLuuTru> locations = viTriRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (ViTriLuuTru loc : locations) {
            long count = hoSoRepository.countByViTriId(loc.getId());
            Map<String, Object> item = new HashMap<>();
            item.put("locationId", loc.getId());
            item.put("warehouse", loc.getPhongKho());
            item.put("shelf", loc.getKeHang());
            item.put("compartment", loc.getNganChua());
            item.put("recordCount", count);
            result.add(item);
        }
        return result;
    }

    public Map<String, Object> getLoanStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("CHO_DUYET", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.CHO_DUYET));
        stats.put("DA_DUYET", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DA_DUYET));
        stats.put("DANG_MUON", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DANG_MUON));
        stats.put("DA_TRA", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.DA_TRA));
        stats.put("QUA_HAN", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.QUA_HAN));
        stats.put("TU_CHOI", phieuMuonRepository.countByTrangThai(TrangThaiPhieuMuon.TU_CHOI));
        return stats;
    }
}
