package com.school.records.modules.records.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.records.enums.TrangThaiTieuHuy;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "de_xuat_tieu_huy")
public class DeXuatTieuHuy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_de_xuat", nullable = false, unique = true, length = 50)
    private String maDeXuat;

    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoi_tao_id")
    private TaiKhoan nguoiTao;

    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoi_duyet_id")
    private TaiKhoan nguoiDuyet;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Column(name = "ngay_duyet")
    private LocalDateTime ngayDuyet;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", columnDefinition = "trang_thai_tieu_huy")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private TrangThaiTieuHuy trangThai;

    @Column(name = "ly_do_tieu_huy", columnDefinition = "TEXT")
    private String lyDoTieuHuy;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "chi_tiet_tieu_huy",
            joinColumns = @JoinColumn(name = "de_xuat_id"),
            inverseJoinColumns = @JoinColumn(name = "ho_so_id")
    )
    private List<HoSo> danhSachHoSo = new ArrayList<>();

    public DeXuatTieuHuy() {}

    public DeXuatTieuHuy(Long id, String maDeXuat, TaiKhoan nguoiTao, TaiKhoan nguoiDuyet, LocalDateTime ngayTao, LocalDateTime ngayDuyet, TrangThaiTieuHuy trangThai, String lyDoTieuHuy, List<HoSo> danhSachHoSo) {
        this.id = id;
        this.maDeXuat = maDeXuat;
        this.nguoiTao = nguoiTao;
        this.nguoiDuyet = nguoiDuyet;
        this.ngayTao = ngayTao;
        this.ngayDuyet = ngayDuyet;
        this.trangThai = trangThai;
        this.lyDoTieuHuy = lyDoTieuHuy;
        if (danhSachHoSo != null) {
            this.danhSachHoSo = danhSachHoSo;
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMaDeXuat() { return maDeXuat; }
    public void setMaDeXuat(String maDeXuat) { this.maDeXuat = maDeXuat; }

    public TaiKhoan getNguoiTao() { return nguoiTao; }
    public void setNguoiTao(TaiKhoan nguoiTao) { this.nguoiTao = nguoiTao; }

    public TaiKhoan getNguoiDuyet() { return nguoiDuyet; }
    public void setNguoiDuyet(TaiKhoan nguoiDuyet) { this.nguoiDuyet = nguoiDuyet; }

    public LocalDateTime getNgayTao() { return ngayTao; }
    public void setNgayTao(LocalDateTime ngayTao) { this.ngayTao = ngayTao; }

    public LocalDateTime getNgayDuyet() { return ngayDuyet; }
    public void setNgayDuyet(LocalDateTime ngayDuyet) { this.ngayDuyet = ngayDuyet; }

    public TrangThaiTieuHuy getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiTieuHuy trangThai) { this.trangThai = trangThai; }

    public String getLyDoTieuHuy() { return lyDoTieuHuy; }
    public void setLyDoTieuHuy(String lyDoTieuHuy) { this.lyDoTieuHuy = lyDoTieuHuy; }

    public List<HoSo> getDanhSachHoSo() { return danhSachHoSo; }
    public void setDanhSachHoSo(List<HoSo> danhSachHoSo) { this.danhSachHoSo = danhSachHoSo; }
}
