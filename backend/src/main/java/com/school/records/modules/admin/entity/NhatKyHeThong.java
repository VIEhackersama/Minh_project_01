package com.school.records.modules.admin.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nhat_ky_he_thong")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NhatKyHeThong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tai_khoan_id")
    private TaiKhoan taiKhoan;

    @Column(name = "hanh_dong", nullable = false)
    private String hanhDong;

    @Column(name = "chi_tiet", columnDefinition = "TEXT")
    private String chiTiet;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "ngay_thuc_hien", insertable = false, updatable = false)
    private LocalDateTime ngayThucHien;
}
