package com.school.records.modules.records.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vi_tri_luu_tru")
public class ViTriLuuTru {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phong_kho", nullable = false, length = 50)
    private String phongKho;

    @Column(name = "ke_hang", nullable = false, length = 50)
    private String keHang;

    @Column(name = "ngan_chua", nullable = false, length = 50)
    private String nganChua;

    @Column(name = "ma_dinh_danh_vi_tri", nullable = false, unique = true, length = 150)
    private String maDinhDanhViTri;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    public ViTriLuuTru() {}

    public ViTriLuuTru(Long id, String phongKho, String keHang, String nganChua, String maDinhDanhViTri, String moTa) {
        this.id = id;
        this.phongKho = phongKho;
        this.keHang = keHang;
        this.nganChua = nganChua;
        this.maDinhDanhViTri = maDinhDanhViTri;
        this.moTa = moTa;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhongKho() { return phongKho; }
    public void setPhongKho(String phongKho) { this.phongKho = phongKho; }

    public String getKeHang() { return keHang; }
    public void setKeHang(String keHang) { this.keHang = keHang; }

    public String getNganChua() { return nganChua; }
    public void setNganChua(String nganChua) { this.nganChua = nganChua; }

    public String getMaDinhDanhViTri() { return maDinhDanhViTri; }
    public void setMaDinhDanhViTri(String maDinhDanhViTri) { this.maDinhDanhViTri = maDinhDanhViTri; }

    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
}
