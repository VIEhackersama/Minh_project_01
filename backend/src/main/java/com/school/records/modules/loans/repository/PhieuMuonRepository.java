package com.school.records.modules.loans.repository;

import com.school.records.modules.loans.entity.PhieuMuon;
import com.school.records.modules.loans.enums.TrangThaiPhieuMuon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhieuMuonRepository extends JpaRepository<PhieuMuon, Long>, JpaSpecificationExecutor<PhieuMuon> {
    List<PhieuMuon> findByNguoiMuonIdOrderByIdDesc(Long nguoiMuonId);
    List<PhieuMuon> findByTrangThai(TrangThaiPhieuMuon trangThai);
    boolean existsByHoSoIdAndTrangThaiIn(Long hoSoId, List<TrangThaiPhieuMuon> trangThais);
    List<PhieuMuon> findByTrangThaiInAndNgayHenTraBefore(List<TrangThaiPhieuMuon> trangThais, LocalDate date);
    long countByTrangThai(TrangThaiPhieuMuon trangThai);

    Optional<PhieuMuon> findFirstByHoSoMaHoSoAndTrangThaiInOrderByIdDesc(String maHoSo, List<TrangThaiPhieuMuon> trangThais);
    Optional<PhieuMuon> findFirstByHoSoIdAndTrangThaiInOrderByIdDesc(Long hoSoId, List<TrangThaiPhieuMuon> trangThais);
}

