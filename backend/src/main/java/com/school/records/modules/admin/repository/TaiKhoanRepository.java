package com.school.records.modules.admin.repository;

import com.school.records.modules.admin.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    Optional<TaiKhoan> findByUsername(String username);
    Optional<TaiKhoan> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    @Query("SELECT t FROM TaiKhoan t WHERE " +
           "(:query IS NULL OR LOWER(t.hoTen) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.username) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:roleId IS NULL OR t.vaiTro.id = :roleId)")
    Page<TaiKhoan> searchUsers(@Param("query") String query, @Param("roleId") String roleId, Pageable pageable);
}
