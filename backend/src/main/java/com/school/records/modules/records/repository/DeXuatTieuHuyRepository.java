package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.DeXuatTieuHuy;
import com.school.records.modules.records.enums.TrangThaiTieuHuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeXuatTieuHuyRepository extends JpaRepository<DeXuatTieuHuy, Long>, JpaSpecificationExecutor<DeXuatTieuHuy> {
    Optional<DeXuatTieuHuy> findByMaDeXuat(String maDeXuat);
    List<DeXuatTieuHuy> findByTrangThai(TrangThaiTieuHuy trangThai);
    long countByTrangThai(TrangThaiTieuHuy trangThai);
}
