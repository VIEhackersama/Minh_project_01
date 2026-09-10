package com.school.records.modules.loans.controller;

import com.school.records.modules.admin.service.AuditService;
import com.school.records.modules.loans.entity.PhieuMuon;
import com.school.records.modules.loans.service.MuonTraService;
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

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/phieu-muon")
public class PhieuMuonController {

    @Autowired
    private MuonTraService muonTraService;

    @Autowired
    private AuditService auditService;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal != null ? principal.toString() : "admin";
    }

    @PostMapping("/dat-giu")
    public ResponseEntity<?> datGiuHoSo(
            @RequestBody DatGiuRequest request,
            HttpServletRequest servletRequest
    ) {
        try {
            String currentUsername = getCurrentUsername();
            PhieuMuon phieuMuon = muonTraService.datGiuHoSo(
                    request.getHoSoId(),
                    currentUsername,
                    request.getNgayHenTra(),
                    request.getLyDoMuon()
            );

            auditService.log(
                    currentUsername,
                    "DAT_GIU_HO_SO",
                    "Đăng ký mượn / Đặt giữ hồ sơ ID: " + request.getHoSoId(),
                    servletRequest
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(phieuMuon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getPhieuMuons(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "onlyMine", required = false, defaultValue = "false") boolean onlyMine,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        // Auto check & mark overdue loans on fetch
        try {
            muonTraService.checkAndMarkOverdueLoans();
        } catch (Exception e) {
            // Log error silently if auto-check encounters issue
        }

        String filterUser = onlyMine ? getCurrentUsername() : null;
        Page<PhieuMuon> phieuPage = muonTraService.searchPhieuMuon(query, status, filterUser, page, size);

        return ResponseEntity.ok(Map.of(
                "content", phieuPage.getContent(),
                "totalPages", phieuPage.getTotalPages(),
                "totalElements", phieuPage.getTotalElements(),
                "size", phieuPage.getSize(),
                "number", phieuPage.getNumber()
        ));
    }

    @GetMapping("/current-loan")
    public ResponseEntity<?> getCurrentLoan(@RequestParam("maHoSo") String maHoSo) {
        return muonTraService.getActiveLoanByMaHoSo(maHoSo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/{id}/duyet")
    @PreAuthorize("hasAuthority('LOAN_MANAGE') or hasAnyRole('ADMIN', 'RECORDS_OFFICER')")
    public ResponseEntity<?> pheDuyet(
            @PathVariable("id") Long id,
            @RequestBody DuyetRequest request,
            HttpServletRequest servletRequest
    ) {
        try {
            String currentUsername = getCurrentUsername();
            PhieuMuon phieuMuon = muonTraService.pheDuyetPhieuMuon(
                    id,
                    currentUsername,
                    request.isApprove(),
                    request.getGhiChu()
            );

            auditService.log(
                    currentUsername,
                    request.isApprove() ? "DUYET_MUON_HO_SO" : "TU_CHOI_MUON_HO_SO",
                    (request.isApprove() ? "Phê duyệt" : "Từ chối") + " mượn hồ sơ phiếu ID: " + id,
                    servletRequest
            );

            return ResponseEntity.ok(phieuMuon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{id}/tra")
    @PreAuthorize("hasAuthority('LOAN_MANAGE') or hasAnyRole('ADMIN', 'RECORDS_OFFICER')")
    public ResponseEntity<?> xacNhanTra(
            @PathVariable("id") Long id,
            HttpServletRequest servletRequest
    ) {
        try {
            String currentUsername = getCurrentUsername();
            PhieuMuon phieuMuon = muonTraService.xacNhanTraHoSo(id, currentUsername);

            auditService.log(
                    currentUsername,
                    "XAC_NHAN_TRA_HO_SO",
                    "Xác nhận nhận lại hồ sơ phiếu ID: " + id,
                    servletRequest
            );

            return ResponseEntity.ok(phieuMuon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/tra-nhanh")
    @PreAuthorize("hasAuthority('LOAN_MANAGE') or hasAnyRole('ADMIN', 'RECORDS_OFFICER')")
    public ResponseEntity<?> xacNhanTraNhanh(
            @RequestBody Map<String, String> request,
            HttpServletRequest servletRequest
    ) {
        try {
            String maHoSo = request.get("maHoSo");
            if (maHoSo == null || maHoSo.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Mã hồ sơ không được để trống"));
            }
            String currentUsername = getCurrentUsername();
            PhieuMuon phieuMuon = muonTraService.xacNhanTraHoSoByMaHoSo(maHoSo.trim(), currentUsername);

            auditService.log(
                    currentUsername,
                    "XAC_NHAN_TRA_HO_SO_QR",
                    "Quét QR/Trả nhanh hồ sơ mã: " + maHoSo + " (Phiếu ID: " + phieuMuon.getId() + ")",
                    servletRequest
            );

            return ResponseEntity.ok(phieuMuon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/check-overdue")
    @PreAuthorize("hasAuthority('LOAN_MANAGE') or hasAnyRole('ADMIN', 'RECORDS_OFFICER')")
    public ResponseEntity<?> checkOverdue(HttpServletRequest servletRequest) {
        try {
            String currentUsername = getCurrentUsername();
            int updatedCount = muonTraService.checkAndMarkOverdueLoans();

            auditService.log(
                    currentUsername,
                    "THUC_THI_QUET_QUA_HAN",
                    "Thực thi quét và chuyển " + updatedCount + " phiếu mượn quá hạn",
                    servletRequest
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Đã quét và cập nhật thành công",
                    "updatedCount", updatedCount
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DatGiuRequest {
        private Long hoSoId;
        private LocalDate ngayHenTra;
        private String lyDoMuon;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DuyetRequest {
        private boolean approve;
        private String ghiChu;
    }
}
