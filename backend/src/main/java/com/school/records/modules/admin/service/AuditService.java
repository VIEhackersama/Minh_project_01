package com.school.records.modules.admin.service;

import com.school.records.modules.admin.entity.NhatKyHeThong;
import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.repository.NhatKyHeThongRepository;
import com.school.records.modules.admin.repository.TaiKhoanRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditService {

    @Autowired
    private NhatKyHeThongRepository nhatKyHeThongRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Transactional
    public void log(String username, String hanhDong, String chiTiet, HttpServletRequest request) {
        String ipAddress = null;
        if (request != null) {
            ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
            }
        }

        TaiKhoan taiKhoan = null;
        if (username != null) {
            taiKhoan = taiKhoanRepository.findByUsername(username).orElse(null);
        }

        NhatKyHeThong logEntry = NhatKyHeThong.builder()
                .taiKhoan(taiKhoan)
                .hanhDong(hanhDong)
                .chiTiet(chiTiet)
                .ipAddress(ipAddress)
                .build();

        nhatKyHeThongRepository.save(logEntry);
    }
}
