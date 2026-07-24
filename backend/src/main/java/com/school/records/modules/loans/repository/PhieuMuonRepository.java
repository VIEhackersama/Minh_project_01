package com.school.records.modules.loans.repository;

import com.school.records.modules.loans.entity.PhieuMuon;
import com.school.records.modules.loans.enums.TrangThaiPhieuMuon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuMuonRepository extends JpaRepository<PhieuMuon, Long>, JpaSpecificationExecutor<PhieuMuon> {
    List<PhieuMuon> findByNguoiMuonIdOrderByIdDesc(Long nguoiMuonId);
    List<PhieuMuon> findByTrangThai(TrangThaiPhieuMuon trangThai);
    boolean existsByHoSoIdAndTrangThaiIn(Long hoSoId, List<TrangThaiPhieuMuon> trangThais);
}
