package com.school.records.modules.records.controller;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.repository.TaiKhoanRepository;
import com.school.records.modules.admin.service.AuditService;
import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.TrangThaiHoSo;
import com.school.records.modules.records.service.HoSoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ho-so")
public class HoSoController {

    @Autowired
    private HoSoService hoSoService;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private AuditService auditService;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal.toString();
    }

    @GetMapping
    public ResponseEntity<?> searchHoSo(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "danhMucId", required = false) Long danhMucId,
            @RequestParam(value = "trangThai", required = false) TrangThaiHoSo trangThai,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<HoSo> resultPage = hoSoService.searchHoSo(query, danhMucId, trangThai, pageable);

        return ResponseEntity.ok(Map.of(
                "content", resultPage.getContent(),
                "totalPages", resultPage.getTotalPages(),
                "totalElements", resultPage.getTotalElements(),
                "size", resultPage.getSize(),
                "number", resultPage.getNumber()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoSo> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(hoSoService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SYS_ADMIN', 'RECORDS_MANAGE', 'ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<?> createHoSo(
            @RequestBody HoSoService.CreateHoSoRequest request,
            HttpServletRequest servletRequest
    ) {
        try {
            String username = getCurrentUsername();
            TaiKhoan nguoiTao = taiKhoanRepository.findByUsername(username).orElse(null);

            HoSo created = hoSoService.createHoSo(request, nguoiTao);

            auditService.log(
                    username,
                    "TAO_HO_SO",
                    "Tạo mới hồ sơ: " + created.getMaHoSo() + " (" + created.getTenHoSo() + ")",
                    servletRequest
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SYS_ADMIN', 'RECORDS_MANAGE', 'ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<?> updateHoSo(
            @PathVariable("id") Long id,
            @RequestBody HoSoService.UpdateHoSoRequest request,
            HttpServletRequest servletRequest
    ) {
        HoSo updated = hoSoService.updateHoSo(id, request);

        auditService.log(
                getCurrentUsername(),
                "CAP_NHAT_HO_SO",
                "Cập nhật hồ sơ: " + updated.getMaHoSo(),
                servletRequest
        );

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SYS_ADMIN', 'RECORDS_MANAGE', 'ROLE_ADMIN', 'ADMIN')")
    public ResponseEntity<?> deleteHoSo(
            @PathVariable("id") Long id,
            HttpServletRequest servletRequest
    ) {
        HoSo existing = hoSoService.getById(id);
        hoSoService.deleteHoSo(id);

        auditService.log(
                getCurrentUsername(),
                "XOA_HO_SO",
                "Xóa hồ sơ: " + existing.getMaHoSo() + " (" + existing.getTenHoSo() + ")",
                servletRequest
        );

        return ResponseEntity.ok(Map.of("message", "Xóa hồ sơ thành công"));
    }
}
