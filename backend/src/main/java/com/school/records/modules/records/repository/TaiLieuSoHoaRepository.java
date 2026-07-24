package com.school.records.modules.records.repository;

import com.school.records.modules.records.entity.TaiLieuSoHoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaiLieuSoHoaRepository extends JpaRepository<TaiLieuSoHoa, Long> {
    List<TaiLieuSoHoa> findByHoSoId(Long hoSoId);
}
