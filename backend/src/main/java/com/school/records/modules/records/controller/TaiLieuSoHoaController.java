package com.school.records.modules.records.controller;

import com.school.records.modules.admin.service.AuditService;
import com.school.records.modules.records.entity.TaiLieuSoHoa;
import com.school.records.modules.records.service.TaiLieuSoHoaService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tai-lieu-so-hoa")
public class TaiLieuSoHoaController {

    @Autowired
    private TaiLieuSoHoaService service;

    @Autowired
    private AuditService auditService;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal != null ? principal.toString() : "admin";
    }

    private boolean isTeacherUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return false;
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER") || a.getAuthority().equals("TEACHER"));
    }

    @GetMapping("/ho-so/{hoSoId}")
    public ResponseEntity<List<TaiLieuSoHoa>> getByHoSoId(@PathVariable("hoSoId") Long hoSoId) {
        return ResponseEntity.ok(service.getByHoSoId(hoSoId));
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("hoSoId") Long hoSoId,
            @RequestParam("file") MultipartFile file,
            HttpServletRequest servletRequest
    ) {
        try {
            TaiLieuSoHoa uploaded = service.uploadDocument(hoSoId, file);

            auditService.log(
                    getCurrentUsername(),
                    "UPLOAD_TAI_LIEU",
                    "Tải lên tài liệu số hóa: " + uploaded.getTenTaiLieu() + " cho hồ sơ ID: " + hoSoId,
                    servletRequest
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(uploaded);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi lưu tệp: " + e.getMessage()));
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadDocument(@PathVariable("id") Long id) {
        try {
            TaiLieuSoHoa taiLieu = service.getById(id);
            if (taiLieu.getHoSo() != null && com.school.records.modules.records.entity.MucDoMat.CONFIDENTIAL.equals(taiLieu.getHoSo().getMucDoMat())) {
                if (isTeacherUser()) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(Map.of("message", "Tài khoản Giáo viên không có quyền xem/tải tài liệu CONFIDENTIAL."));
                }
            }
            InputStream inputStream = service.downloadDocumentStream(id);

            String encodedFilename = URLEncoder.encode(taiLieu.getTenTaiLieu(), StandardCharsets.UTF_8).replace("+", "%20");

            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (taiLieu.getDinhDangFile() != null) {
                switch (taiLieu.getDinhDangFile().toLowerCase()) {
                    case "pdf": mediaType = MediaType.APPLICATION_PDF; break;
                    case "png": mediaType = MediaType.IMAGE_PNG; break;
                    case "jpg":
                    case "jpeg": mediaType = MediaType.IMAGE_JPEG; break;
                }
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + encodedFilename + "\"")
                    .contentType(mediaType)
                    .body(new InputStreamResource(inputStream));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Không thể lấy tệp: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(
            @PathVariable("id") Long id,
            HttpServletRequest servletRequest
    ) {
        try {
            TaiLieuSoHoa taiLieu = service.getById(id);
            service.deleteDocument(id);

            auditService.log(
                    getCurrentUsername(),
                    "XOA_TAI_LIEU",
                    "Xóa tài liệu số hóa: " + taiLieu.getTenTaiLieu(),
                    servletRequest
            );

            return ResponseEntity.ok(Map.of("message", "Xóa tài liệu thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi xóa tài liệu: " + e.getMessage()));
        }
    }
}
