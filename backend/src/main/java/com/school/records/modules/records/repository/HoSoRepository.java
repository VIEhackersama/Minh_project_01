package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.HoSo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface HoSoRepository extends JpaRepository<HoSo, Long>, JpaSpecificationExecutor<HoSo> {
    boolean existsByMaHoSo(String maHoSo);
    Optional<HoSo> findByMaHoSo(String maHoSo);
    boolean existsByDanhMucId(Long danhMucId);
    boolean existsByViTriId(Long viTriId);
}
