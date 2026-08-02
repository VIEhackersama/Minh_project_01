package com.school.records.modules.admin.repository;

import com.school.records.modules.admin.entity.NhatKyHeThong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NhatKyHeThongRepository extends JpaRepository<NhatKyHeThong, Long>, JpaSpecificationExecutor<NhatKyHeThong> {
}
