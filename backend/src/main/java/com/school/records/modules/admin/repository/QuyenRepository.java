package com.school.records.modules.admin.repository;

import com.school.records.modules.admin.entity.Quyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuyenRepository extends JpaRepository<Quyen, String> {
}
