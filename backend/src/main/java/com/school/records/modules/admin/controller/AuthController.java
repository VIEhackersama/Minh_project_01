package com.school.records.modules.admin.controller;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.service.AuditService;
import com.school.records.security.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuditService auditService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            TaiKhoan taiKhoan = (TaiKhoan) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(taiKhoan);
            String refreshToken = jwtService.generateRefreshToken(taiKhoan);

            // Create httpOnly cookie for Refresh Token
            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // Set true in production if HTTPS is configured
            cookie.setPath("/api/auth"); // Only send to auth endpoints
            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
            servletResponse.addCookie(cookie);

            auditService.log(taiKhoan.getUsername(), "DANG_NHAP", "Đăng nhập thành công", servletRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("user", Map.of(
                    "id", taiKhoan.getId(),
                    "username", taiKhoan.getUsername(),
                    "hoTen", taiKhoan.getHoTen(),
                    "email", taiKhoan.getEmail(),
                    "role", taiKhoan.getVaiTro() != null ? taiKhoan.getVaiTro().getId() : "TEACHER"
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            auditService.log(request.getUsername(), "DANG_NHAP_THAT_BAI", "Đăng nhập thất bại: " + e.getMessage(), servletRequest);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Tên đăng nhập hoặc mật khẩu không chính xác"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        Cookie[] cookies = servletRequest.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Thiếu Refresh Token"));
        }

        try {
            String username = jwtService.extractUsername(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                String accessToken = jwtService.generateAccessToken(userDetails);
                
                // Optional: Rotate refresh token
                String newRefreshToken = jwtService.generateRefreshToken(userDetails);
                Cookie cookie = new Cookie("refreshToken", newRefreshToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(false);
                cookie.setPath("/api/auth");
                cookie.setMaxAge(7 * 24 * 60 * 60);
                servletResponse.addCookie(cookie);

                return ResponseEntity.ok(Map.of("accessToken", accessToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Refresh Token không hợp lệ hoặc đã hết hạn"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Lỗi xử lý Refresh Token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest servletRequest,
            HttpServletResponse servletResponse
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            username = ((UserDetails) authentication.getPrincipal()).getUsername();
        }

        // Clear refresh token cookie
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/api/auth");
        cookie.setMaxAge(0); // Delete cookie
        servletResponse.addCookie(cookie);

        if (username != null) {
            auditService.log(username, "DANG_XUAT", "Đăng xuất thành công", servletRequest);
        }

        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Đăng xuất thành công"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || 
                !(authentication.getPrincipal() instanceof TaiKhoan)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Chưa đăng nhập"));
        }

        TaiKhoan taiKhoan = (TaiKhoan) authentication.getPrincipal();
        Map<String, Object> response = new HashMap<>();
        response.put("id", taiKhoan.getId());
        response.put("username", taiKhoan.getUsername());
        response.put("hoTen", taiKhoan.getHoTen());
        response.put("email", taiKhoan.getEmail());
        response.put("role", taiKhoan.getVaiTro() != null ? taiKhoan.getVaiTro().getId() : "TEACHER");
        response.put("permissions", taiKhoan.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .filter(auth -> !auth.startsWith("ROLE_"))
                .collect(Collectors.toList()));

        return ResponseEntity.ok(response);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }
}
