package com.school.records.modules.records.controller;

import com.school.records.modules.admin.service.AuditService;
import com.school.records.modules.records.entity.DeXuatTieuHuy;
import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.service.TieuHuyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/destruction")
public class TieuHuyController {

    @Autowired
    private TieuHuyService tieuHuyService;

    @Autowired
    private AuditService auditService;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal != null ? principal.toString() : "admin";
    }

    @GetMapping("/eligible")
    public ResponseEntity<List<HoSo>> getEligibleRecords() {
        return ResponseEntity.ok(tieuHuyService.getEligibleRecords());
    }

    @GetMapping
    public ResponseEntity<?> getAllDeXuat(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<DeXuatTieuHuy> resultPage = tieuHuyService.getAllDeXuat(page, size);
        return ResponseEntity.ok(Map.of(
                "content", resultPage.getContent(),
                "totalPages", resultPage.getTotalPages(),
                "totalElements", resultPage.getTotalElements(),
                "size", resultPage.getSize(),
                "number", resultPage.getNumber()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeXuatById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(tieuHuyService.getDeXuatById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createDeXuat(
            @RequestBody CreateDeXuatRequest request,
            HttpServletRequest servletRequest
    ) {
        try {
            String username = getCurrentUsername();
            DeXuatTieuHuy deXuat = tieuHuyService.createDeXuat(
                    request.getLyDoTieuHuy(),
                    request.getHoSoIds(),
                    username
            );

            auditService.log(username, "TAO_DE_XUAT_TIEU_HUY", "Tạo đề xuất tiêu hủy mã: " + deXuat.getMaDeXuat(), servletRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(deXuat);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitDeXuat(@PathVariable("id") Long id, HttpServletRequest servletRequest) {
        try {
            String username = getCurrentUsername();
            DeXuatTieuHuy deXuat = tieuHuyService.submitDeXuat(id);
            auditService.log(username, "TRINH_DUYET_TIEU_HUY", "Trình duyệt đề xuất tiêu hủy ID: " + id, servletRequest);
            return ResponseEntity.ok(deXuat);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveDeXuat(@PathVariable("id") Long id, HttpServletRequest servletRequest) {
        try {
            String username = getCurrentUsername();
            DeXuatTieuHuy deXuat = tieuHuyService.approveDeXuat(id, username);
            auditService.log(username, "PHE_DUYET_TIEU_HUY", "Phê duyệt đề xuất tiêu hủy ID: " + id, servletRequest);
            return ResponseEntity.ok(deXuat);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{id}/execute")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> executeDeXuat(@PathVariable("id") Long id, HttpServletRequest servletRequest) {
        try {
            String username = getCurrentUsername();
            DeXuatTieuHuy deXuat = tieuHuyService.executeDeXuat(id);
            auditService.log(username, "THUC_THI_TIEU_HUY", "Thực thi tiêu hủy hồ sơ theo đề xuất ID: " + id, servletRequest);
            return ResponseEntity.ok(deXuat);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateDeXuatRequest {
        private String lyDoTieuHuy;
        private List<Long> hoSoIds;
    }
}
