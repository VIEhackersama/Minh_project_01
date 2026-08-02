package com.school.records.modules.admin.controller;

import com.school.records.modules.admin.entity.NhatKyHeThong;
import com.school.records.modules.admin.repository.NhatKyHeThongRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/audit-logs")
public class AuditController {

    @Autowired
    private NhatKyHeThongRepository nhatKyHeThongRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SYS_ADMIN') or hasAuthority('SYS_ADMIN')")
    public ResponseEntity<?> getAuditLogs(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "action", required = false) String action,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "15") int size
    ) {
        String cleanQuery = (query != null && !query.trim().isEmpty()) ? query.trim() : null;
        String cleanAction = (action != null && !action.trim().isEmpty() && !"ALL".equalsIgnoreCase(action)) ? action.trim() : null;

        Specification<NhatKyHeThong> spec = (root, q, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (cleanQuery != null) {
                String pattern = "%" + cleanQuery.toLowerCase() + "%";
                Predicate matchHanhDong = cb.like(cb.lower(root.get("hanhDong")), pattern);
                Predicate matchChiTiet = cb.like(cb.lower(root.get("chiTiet")), pattern);
                Predicate matchIp = cb.like(cb.lower(root.get("ipAddress")), pattern);
                
                // Join taiKhoan
                var taiKhoanJoin = root.join("taiKhoan", jakarta.persistence.criteria.JoinType.LEFT);
                Predicate matchUsername = cb.like(cb.lower(taiKhoanJoin.get("username")), pattern);
                Predicate matchHoTen = cb.like(cb.lower(taiKhoanJoin.get("hoTen")), pattern);

                predicates.add(cb.or(matchHanhDong, matchChiTiet, matchIp, matchUsername, matchHoTen));
            }

            if (cleanAction != null) {
                predicates.add(cb.equal(root.get("hanhDong"), cleanAction));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<NhatKyHeThong> logPage = nhatKyHeThongRepository.findAll(spec, pageable);

        List<AuditLogDTO> dtoList = logPage.getContent().stream().map(log -> {
            String username = "SYSTEM";
            String hoTen = "Hệ thống";

            if (log.getTaiKhoan() != null) {
                username = log.getTaiKhoan().getUsername();
                hoTen = log.getTaiKhoan().getHoTen();
            }

            return AuditLogDTO.builder()
                    .id(log.getId())
                    .username(username)
                    .hoTen(hoTen)
                    .hanhDong(log.getHanhDong())
                    .chiTiet(log.getChiTiet())
                    .ipAddress(log.getIpAddress())
                    .ngayThucHien(log.getNgayThucHien())
                    .build();
        }).collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "content", dtoList,
                "totalPages", logPage.getTotalPages(),
                "totalElements", logPage.getTotalElements(),
                "size", logPage.getSize(),
                "number", logPage.getNumber()
        ));
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuditLogDTO {
        private Long id;
        private String username;
        private String hoTen;
        private String hanhDong;
        private String chiTiet;
        private String ipAddress;
        private LocalDateTime ngayThucHien;
    }
}
