package com.school.records.modules.records.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tai_lieu_so_hoa")
public class TaiLieuSoHoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ho_so_id", nullable = false)
    private HoSo hoSo;

    @Column(name = "ten_tai_lieu", nullable = false, length = 255)
    private String tenTaiLieu;

    @Column(name = "duong_dan_file", nullable = false, length = 512)
    private String duongDanFile;

    @Column(name = "checksum", length = 64)
    private String checksum;

    @Column(name = "kich_thuoc")
    private Long kichThuoc;

    @Column(name = "dinh_dang_file", length = 10)
    private String dinhDangFile;

    @Column(name = "ngay_tai_len", insertable = false, updatable = false)
    private LocalDateTime ngayTaiLen;

    public TaiLieuSoHoa() {}

    public TaiLieuSoHoa(Long id, HoSo hoSo, String tenTaiLieu, String duongDanFile, String checksum, Long kichThuoc, String dinhDangFile, LocalDateTime ngayTaiLen) {
        this.id = id;
        this.hoSo = hoSo;
        this.tenTaiLieu = tenTaiLieu;
        this.duongDanFile = duongDanFile;
        this.checksum = checksum;
        this.kichThuoc = kichThuoc;
        this.dinhDangFile = dinhDangFile;
        this.ngayTaiLen = ngayTaiLen;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private HoSo hoSo;
        private String tenTaiLieu;
        private String duongDanFile;
        private String checksum;
        private Long kichThuoc;
        private String dinhDangFile;
        private LocalDateTime ngayTaiLen;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder hoSo(HoSo hoSo) { this.hoSo = hoSo; return this; }
        public Builder tenTaiLieu(String tenTaiLieu) { this.tenTaiLieu = tenTaiLieu; return this; }
        public Builder duongDanFile(String duongDanFile) { this.duongDanFile = duongDanFile; return this; }
        public Builder checksum(String checksum) { this.checksum = checksum; return this; }
        public Builder kichThuoc(Long kichThuoc) { this.kichThuoc = kichThuoc; return this; }
        public Builder dinhDangFile(String dinhDangFile) { this.dinhDangFile = dinhDangFile; return this; }
        public Builder ngayTaiLen(LocalDateTime ngayTaiLen) { this.ngayTaiLen = ngayTaiLen; return this; }

        public TaiLieuSoHoa build() {
            return new TaiLieuSoHoa(id, hoSo, tenTaiLieu, duongDanFile, checksum, kichThuoc, dinhDangFile, ngayTaiLen);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public HoSo getHoSo() { return hoSo; }
    public void setHoSo(HoSo hoSo) { this.hoSo = hoSo; }

    public String getTenTaiLieu() { return tenTaiLieu; }
    public void setTenTaiLieu(String tenTaiLieu) { this.tenTaiLieu = tenTaiLieu; }

    public String getDuongDanFile() { return duongDanFile; }
    public void setDuongDanFile(String duongDanFile) { this.duongDanFile = duongDanFile; }

    public String getChecksum() { return checksum; }
    public void setChecksum(String checksum) { this.checksum = checksum; }

    public Long getKichThuoc() { return kichThuoc; }
    public void setKichThuoc(Long kichThuoc) { this.kichThuoc = kichThuoc; }

    public String getDinhDangFile() { return dinhDangFile; }
    public void setDinhDangFile(String dinhDangFile) { this.dinhDangFile = dinhDangFile; }

    public LocalDateTime getNgayTaiLen() { return ngayTaiLen; }
    public void setNgayTaiLen(LocalDateTime ngayTaiLen) { this.ngayTaiLen = ngayTaiLen; }
}
