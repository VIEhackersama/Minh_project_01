package com.school.records.modules.records.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "danh_muc_loai_ho_so")
public class DanhMucLoaiHoSo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_loai", nullable = false, length = 150)
    private String tenLoai;

    @Column(name = "thoi_han_bao_quan_nam", nullable = false)
    private Integer thoiHanBaoQuanNam;

    @Column(name = "don_vi_thoi_han", length = 20)
    private String donViThoiHan; // NAM, THANG, NGAY

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    public DanhMucLoaiHoSo() {}

    public DanhMucLoaiHoSo(Long id, String tenLoai, Integer thoiHanBaoQuanNam, String donViThoiHan, String moTa) {
        this.id = id;
        this.tenLoai = tenLoai;
        this.thoiHanBaoQuanNam = thoiHanBaoQuanNam;
        this.donViThoiHan = donViThoiHan;
        this.moTa = moTa;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenLoai() { return tenLoai; }
    public void setTenLoai(String tenLoai) { this.tenLoai = tenLoai; }

    public Integer getThoiHanBaoQuanNam() { return thoiHanBaoQuanNam; }
    public void setThoiHanBaoQuanNam(Integer thoiHanBaoQuanNam) { this.thoiHanBaoQuanNam = thoiHanBaoQuanNam; }

    public String getDonViThoiHan() { return donViThoiHan != null ? donViThoiHan : "NAM"; }
    public void setDonViThoiHan(String donViThoiHan) { this.donViThoiHan = donViThoiHan; }

    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
}
