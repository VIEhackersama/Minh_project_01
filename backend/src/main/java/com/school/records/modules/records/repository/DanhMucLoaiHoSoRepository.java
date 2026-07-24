package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.DanhMucLoaiHoSo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DanhMucLoaiHoSoRepository extends JpaRepository<DanhMucLoaiHoSo, Long> {
    boolean existsByTenLoai(String tenLoai);
}
