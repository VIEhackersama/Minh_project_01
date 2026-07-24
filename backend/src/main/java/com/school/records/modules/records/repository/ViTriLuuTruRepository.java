package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.ViTriLuuTru;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ViTriLuuTruRepository extends JpaRepository<ViTriLuuTru, Long> {
    boolean existsByMaDinhDanhViTri(String maDinhDanhViTri);
    Optional<ViTriLuuTru> findByMaDinhDanhViTri(String maDinhDanhViTri);
    Optional<ViTriLuuTru> findByPhongKhoAndKeHangAndNganChua(String phongKho, String keHang, String nganChua);

    @Query("SELECT DISTINCT v.phongKho FROM ViTriLuuTru v WHERE v.phongKho IS NOT NULL ORDER BY v.phongKho")
    List<String> findDistinctPhongKho();

    @Query("SELECT DISTINCT v.keHang FROM ViTriLuuTru v WHERE (:phongKho IS NULL OR v.phongKho = :phongKho) AND v.keHang IS NOT NULL ORDER BY v.keHang")
    List<String> findDistinctKeHang(@Param("phongKho") String phongKho);

    @Query("SELECT DISTINCT v.nganChua FROM ViTriLuuTru v WHERE (:phongKho IS NULL OR v.phongKho = :phongKho) AND (:keHang IS NULL OR v.keHang = :keHang) AND v.nganChua IS NOT NULL ORDER BY v.nganChua")
    List<String> findDistinctNganChua(@Param("phongKho") String phongKho, @Param("keHang") String keHang);
}
