package com.school.records.modules.records.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.school.records.modules.admin.entity.TaiKhoan;
import jakarta.persistence.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.time.LocalDate;

@Entity
@Table(name = "ho_so")
public class HoSo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_ho_so", nullable = false, unique = true, length = 50)
    private String maHoSo;

    @Column(name = "ten_ho_so", nullable = false, length = 255)
    private String tenHoSo;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "danh_muc_id")
    private DanhMucLoaiHoSo danhMuc;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vi_tri_id")
    private ViTriLuuTru viTri;

    @Column(name = "ngay_lap", nullable = false)
    private LocalDate ngayLap;

    @Column(name = "thoi_han_bao_quan_den")
    private LocalDate thoiHanBaoQuanDen;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", columnDefinition = "trang_thai_ho_so")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private TrangThaiHoSo trangThai;

    @Enumerated(EnumType.STRING)
    @Column(name = "muc_do_mat", columnDefinition = "muc_do_mat")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private MucDoMat mucDoMat;

    @Column(name = "qr_active")
    private Boolean qrActive;

    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoi_tao_id")
    private TaiKhoan nguoiTao;

    @Formula("(SELECT COUNT(t.id) > 0 FROM tai_lieu_so_hoa t WHERE t.ho_so_id = id)")
    private Boolean daSoHoa;

    @Formula("(SELECT COUNT(t.id) FROM tai_lieu_so_hoa t WHERE t.ho_so_id = id)")
    private Long soLuongTaiLieu;

    public HoSo() {}

    public HoSo(Long id, String maHoSo, String tenHoSo, DanhMucLoaiHoSo danhMuc, ViTriLuuTru viTri,
                LocalDate ngayLap, LocalDate thoiHanBaoQuanDen, TrangThaiHoSo trangThai,
                MucDoMat mucDoMat, Boolean qrActive, TaiKhoan nguoiTao) {
        this.id = id;
        this.maHoSo = maHoSo;
        this.tenHoSo = tenHoSo;
        this.danhMuc = danhMuc;
        this.viTri = viTri;
        this.ngayLap = ngayLap;
        this.thoiHanBaoQuanDen = thoiHanBaoQuanDen;
        this.trangThai = trangThai;
        this.mucDoMat = mucDoMat;
        this.qrActive = qrActive;
        this.nguoiTao = nguoiTao;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String maHoSo;
        private String tenHoSo;
        private DanhMucLoaiHoSo danhMuc;
        private ViTriLuuTru viTri;
        private LocalDate ngayLap;
        private LocalDate thoiHanBaoQuanDen;
        private TrangThaiHoSo trangThai;
        private MucDoMat mucDoMat;
        private Boolean qrActive;
        private TaiKhoan nguoiTao;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder maHoSo(String maHoSo) { this.maHoSo = maHoSo; return this; }
        public Builder tenHoSo(String tenHoSo) { this.tenHoSo = tenHoSo; return this; }
        public Builder danhMuc(DanhMucLoaiHoSo danhMuc) { this.danhMuc = danhMuc; return this; }
        public Builder viTri(ViTriLuuTru viTri) { this.viTri = viTri; return this; }
        public Builder ngayLap(LocalDate ngayLap) { this.ngayLap = ngayLap; return this; }
        public Builder thoiHanBaoQuanDen(LocalDate thoiHanBaoQuanDen) { this.thoiHanBaoQuanDen = thoiHanBaoQuanDen; return this; }
        public Builder trangThai(TrangThaiHoSo trangThai) { this.trangThai = trangThai; return this; }
        public Builder mucDoMat(MucDoMat mucDoMat) { this.mucDoMat = mucDoMat; return this; }
        public Builder qrActive(Boolean qrActive) { this.qrActive = qrActive; return this; }
        public Builder nguoiTao(TaiKhoan nguoiTao) { this.nguoiTao = nguoiTao; return this; }

        public HoSo build() {
            return new HoSo(id, maHoSo, tenHoSo, danhMuc, viTri, ngayLap, thoiHanBaoQuanDen, trangThai, mucDoMat, qrActive, nguoiTao);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMaHoSo() { return maHoSo; }
    public void setMaHoSo(String maHoSo) { this.maHoSo = maHoSo; }

    public String getTenHoSo() { return tenHoSo; }
    public void setTenHoSo(String tenHoSo) { this.tenHoSo = tenHoSo; }

    public DanhMucLoaiHoSo getDanhMuc() { return danhMuc; }
    public void setDanhMuc(DanhMucLoaiHoSo danhMuc) { this.danhMuc = danhMuc; }

    public ViTriLuuTru getViTri() { return viTri; }
    public void setViTri(ViTriLuuTru viTri) { this.viTri = viTri; }

    public LocalDate getNgayLap() { return ngayLap; }
    public void setNgayLap(LocalDate ngayLap) { this.ngayLap = ngayLap; }

    public LocalDate getThoiHanBaoQuanDen() { return thoiHanBaoQuanDen; }
    public void setThoiHanBaoQuanDen(LocalDate thoiHanBaoQuanDen) { this.thoiHanBaoQuanDen = thoiHanBaoQuanDen; }

    public TrangThaiHoSo getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiHoSo trangThai) { this.trangThai = trangThai; }

    public MucDoMat getMucDoMat() { return mucDoMat; }
    public void setMucDoMat(MucDoMat mucDoMat) { this.mucDoMat = mucDoMat; }

    public Boolean getQrActive() { return qrActive; }
    public void setQrActive(Boolean qrActive) { this.qrActive = qrActive; }

    public TaiKhoan getNguoiTao() { return nguoiTao; }
    public void setNguoiTao(TaiKhoan nguoiTao) { this.nguoiTao = nguoiTao; }

    public Boolean getDaSoHoa() { return daSoHoa != null && daSoHoa; }
    public void setDaSoHoa(Boolean daSoHoa) { this.daSoHoa = daSoHoa; }

    public Long getSoLuongTaiLieu() { return soLuongTaiLieu != null ? soLuongTaiLieu : 0L; }
    public void setSoLuongTaiLieu(Long soLuongTaiLieu) { this.soLuongTaiLieu = soLuongTaiLieu; }
}
