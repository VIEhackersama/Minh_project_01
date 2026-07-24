package com.school.records.modules.admin.repository;

import com.school.records.modules.admin.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long>, JpaSpecificationExecutor<TaiKhoan> {
    Optional<TaiKhoan> findByUsername(String username);
    Optional<TaiKhoan> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
