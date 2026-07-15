package com.school.records.modules.admin.repository;

import com.school.records.modules.admin.entity.VaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaiTroRepository extends JpaRepository<VaiTro, String> {
}
