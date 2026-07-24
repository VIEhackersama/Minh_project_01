package com.school.records.modules.records.service;

import com.school.records.modules.records.entity.ViTriLuuTru;
import com.school.records.modules.records.repository.ViTriLuuTruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViTriLuuTruService {
    @Autowired
    private ViTriLuuTruRepository repository;

    public List<ViTriLuuTru> getAll() {
        return repository.findAll();
    }

    public ViTriLuuTru getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy vị trí lưu trữ: " + id));
    }

    public ViTriLuuTru findOrCreate(String phongKho, String keHang, String nganChua) {
        if (phongKho == null || phongKho.trim().isEmpty()) {
            throw new IllegalArgumentException("Phòng Kho không được để trống");
        }
        if (keHang == null || keHang.trim().isEmpty()) {
            throw new IllegalArgumentException("Kệ hàng không được để trống");
        }
        if (nganChua == null || nganChua.trim().isEmpty()) {
            throw new IllegalArgumentException("Ngăn chứa không được để trống");
        }

        String cleanKho = phongKho.trim();
        String cleanKe = keHang.trim();
        String cleanNgan = nganChua.trim();

        String generatedMa = generateMaDinhDanh(cleanKho, cleanKe, cleanNgan);

        return repository.findByMaDinhDanhViTri(generatedMa)
                .orElseGet(() -> {
                    ViTriLuuTru newLoc = new ViTriLuuTru();
                    newLoc.setPhongKho(cleanKho);
                    newLoc.setKeHang(cleanKe);
                    newLoc.setNganChua(cleanNgan);
                    newLoc.setMaDinhDanhViTri(generatedMa);
                    newLoc.setMoTa("Vị trí lưu kho " + generatedMa);
                    return repository.save(newLoc);
                });
    }

    public ViTriLuuTru create(ViTriLuuTru entity) {
        String generatedMa = generateMaDinhDanh(entity.getPhongKho(), entity.getKeHang(), entity.getNganChua());
        entity.setMaDinhDanhViTri(generatedMa);

        if (repository.existsByMaDinhDanhViTri(generatedMa)) {
            throw new IllegalArgumentException("Mã vị trí lưu trữ đã tồn tại: " + generatedMa);
        }
        return repository.save(entity);
    }

    public ViTriLuuTru update(Long id, ViTriLuuTru updateData) {
        ViTriLuuTru existing = getById(id);
        existing.setPhongKho(updateData.getPhongKho());
        existing.setKeHang(updateData.getKeHang());
        existing.setNganChua(updateData.getNganChua());
        existing.setMoTa(updateData.getMoTa());

        String generatedMa = generateMaDinhDanh(updateData.getPhongKho(), updateData.getKeHang(), updateData.getNganChua());
        existing.setMaDinhDanhViTri(generatedMa);

        return repository.save(existing);
    }

    public void delete(Long id) {
        ViTriLuuTru existing = getById(id);
        repository.delete(existing);
    }

    public List<String> getDistinctPhongKho() {
        return repository.findDistinctPhongKho();
    }

    public List<String> getDistinctKeHang(String phongKho) {
        return repository.findDistinctKeHang(phongKho != null && !phongKho.trim().isEmpty() ? phongKho.trim() : null);
    }

    public List<String> getDistinctNganChua(String phongKho, String keHang) {
        String cleanKho = phongKho != null && !phongKho.trim().isEmpty() ? phongKho.trim() : null;
        String cleanKe = keHang != null && !keHang.trim().isEmpty() ? keHang.trim() : null;
        return repository.findDistinctNganChua(cleanKho, cleanKe);
    }

    public String generateMaDinhDanh(String phongKho, String keHang, String nganChua) {
        String cleanKho = phongKho != null ? phongKho.replaceAll("\\s+", "") : "";
        String cleanKe = keHang != null ? keHang.replaceAll("\\s+", "") : "";
        String cleanNgan = nganChua != null ? nganChua.replaceAll("\\s+", "") : "";
        return cleanKho + "-" + cleanKe + "-" + cleanNgan;
    }
}
