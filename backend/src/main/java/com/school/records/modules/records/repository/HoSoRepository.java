package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.TrangThaiHoSo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HoSoRepository extends JpaRepository<HoSo, Long>, JpaSpecificationExecutor<HoSo> {
    boolean existsByMaHoSo(String maHoSo);
    Optional<HoSo> findByMaHoSo(String maHoSo);
    boolean existsByDanhMucId(Long danhMucId);
    boolean existsByViTriId(Long viTriId);

    List<HoSo> findByThoiHanBaoQuanDenBeforeAndTrangThai(LocalDate date, TrangThaiHoSo trangThai);
    long countByTrangThai(TrangThaiHoSo trangThai);
    long countByDanhMucId(Long danhMucId);
    long countByViTriId(Long viTriId);
}

