package com.school.records.modules.admin.controller;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.entity.VaiTro;
import com.school.records.modules.admin.repository.TaiKhoanRepository;
import com.school.records.modules.admin.repository.VaiTroRepository;
import com.school.records.modules.admin.service.AuditService;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private VaiTroRepository vaiTroRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditService auditService;

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return principal != null ? principal.toString() : "admin";
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "roleId", required = false) String roleId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        // Clean empty values to null
        String cleanQuery = (query != null && !query.trim().isEmpty()) ? query.trim() : null;
        String cleanRoleId = (roleId != null && !roleId.trim().isEmpty() && !"ALL".equalsIgnoreCase(roleId)) ? roleId.trim() : null;

        Specification<TaiKhoan> spec = (root, q, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (cleanQuery != null) {
                String pattern = "%" + cleanQuery.toLowerCase() + "%";
                Predicate matchHoTen = cb.like(cb.lower(root.get("hoTen")), pattern);
                Predicate matchUsername = cb.like(cb.lower(root.get("username")), pattern);
                predicates.add(cb.or(matchHoTen, matchUsername));
            }

            if (cleanRoleId != null) {
                predicates.add(cb.equal(root.get("vaiTro").get("id"), cleanRoleId));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<TaiKhoan> userPage = taiKhoanRepository.findAll(spec, pageable);

        return ResponseEntity.ok(Map.of(
                "content", userPage.getContent(),
                "totalPages", userPage.getTotalPages(),
                "totalElements", userPage.getTotalElements(),
                "size", userPage.getSize(),
                "number", userPage.getNumber()
        ));
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(
            @RequestBody CreateUserRequest request,
            HttpServletRequest servletRequest
    ) {
        if (taiKhoanRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Tên đăng nhập đã tồn tại"));
        }

        if (taiKhoanRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email đã được đăng ký"));
        }

        VaiTro vaiTro = vaiTroRepository.findById(request.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vai trò: " + request.getRoleId()));

        TaiKhoan newUser = TaiKhoan.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .hoTen(request.getHoTen())
                .email(request.getEmail())
                .vaiTro(vaiTro)
                .trangThai(request.getTrangThai() != null ? request.getTrangThai() : true)
                .build();

        taiKhoanRepository.save(newUser);

        auditService.log(
                getCurrentUsername(),
                "TAO_TAI_KHOAN",
                "Tạo tài khoản mới: " + newUser.getUsername() + " (" + newUser.getHoTen() + ")",
                servletRequest
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable("id") Long id,
            @RequestBody UpdateUserRequest request,
            HttpServletRequest servletRequest
    ) {
        TaiKhoan existingUser = taiKhoanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản với id: " + id));

        // Validate unique email if changing
        if (!existingUser.getEmail().equalsIgnoreCase(request.getEmail()) &&
                taiKhoanRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email đã được đăng ký"));
        }

        VaiTro vaiTro = vaiTroRepository.findById(request.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vai trò: " + request.getRoleId()));

        existingUser.setHoTen(request.getHoTen());
        existingUser.setEmail(request.getEmail());
        existingUser.setVaiTro(vaiTro);
        
        if (request.getTrangThai() != null) {
            existingUser.setTrangThai(request.getTrangThai());
        }

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword().trim()));
        }

        taiKhoanRepository.save(existingUser);

        auditService.log(
                getCurrentUsername(),
                "CAP_NHAT_TAI_KHOAN",
                "Cập nhật tài khoản: " + existingUser.getUsername() + " (" + existingUser.getHoTen() + ")",
                servletRequest
        );

        return ResponseEntity.ok(existingUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable("id") Long id,
            HttpServletRequest servletRequest
    ) {
        TaiKhoan existingUser = taiKhoanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản với id: " + id));

        // Prevent admin from deleting their own account
        String currentUsername = getCurrentUsername();
        if (existingUser.getUsername().equalsIgnoreCase(currentUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Không thể tự xóa tài khoản của chính mình"));
        }

        taiKhoanRepository.delete(existingUser);

        auditService.log(
                currentUsername,
                "XOA_TAI_KHOAN",
                "Xóa tài khoản: " + existingUser.getUsername() + " (" + existingUser.getHoTen() + ")",
                servletRequest
        );

        return ResponseEntity.ok(Map.of("message", "Xóa tài khoản thành công"));
    }

    @PostMapping("/users/{id}/toggle-status")
    public ResponseEntity<?> toggleStatus(
            @PathVariable("id") Long id,
            HttpServletRequest servletRequest
    ) {
        TaiKhoan existingUser = taiKhoanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản với id: " + id));

        String currentUsername = getCurrentUsername();
        if (existingUser.getUsername().equalsIgnoreCase(currentUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Không thể tự thay đổi trạng thái hoạt động của chính mình"));
        }

        existingUser.setTrangThai(!existingUser.getTrangThai());
        taiKhoanRepository.save(existingUser);

        auditService.log(
                currentUsername,
                existingUser.getTrangThai() ? "MO_KHOA_TAI_KHOAN" : "KHOA_TAI_KHOAN",
                (existingUser.getTrangThai() ? "Mở khóa" : "Khóa") + " tài khoản: " + existingUser.getUsername(),
                servletRequest
        );

        return ResponseEntity.ok(existingUser);
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        List<VaiTro> roles = vaiTroRepository.findAll();
        return ResponseEntity.ok(roles);
    }

    @Data
    public static class CreateUserRequest {
        private String username;
        private String password;
        private String hoTen;
        private String email;
        private String roleId;
        private Boolean trangThai;
    }

    @Data
    public static class UpdateUserRequest {
        private String password; // optional
        private String hoTen;
        private String email;
        private String roleId;
        private Boolean trangThai;
    }
}
