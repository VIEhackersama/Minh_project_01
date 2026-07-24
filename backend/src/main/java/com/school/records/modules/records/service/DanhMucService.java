package com.school.records.modules.records.service;

import com.school.records.modules.records.entity.DanhMucLoaiHoSo;
import com.school.records.modules.records.repository.DanhMucLoaiHoSoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhMucService {
    @Autowired
    private DanhMucLoaiHoSoRepository repository;

    public List<DanhMucLoaiHoSo> getAll() {
        return repository.findAll();
    }

    public DanhMucLoaiHoSo getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy loại hồ sơ: " + id));
    }

    public DanhMucLoaiHoSo create(DanhMucLoaiHoSo entity) {
        if (repository.existsByTenLoai(entity.getTenLoai())) {
            throw new IllegalArgumentException("Tên loại hồ sơ đã tồn tại: " + entity.getTenLoai());
        }
        return repository.save(entity);
    }

    public DanhMucLoaiHoSo update(Long id, DanhMucLoaiHoSo updateData) {
        DanhMucLoaiHoSo existing = getById(id);
        existing.setTenLoai(updateData.getTenLoai());
        existing.setThoiHanBaoQuanNam(updateData.getThoiHanBaoQuanNam());
        existing.setMoTa(updateData.getMoTa());
        return repository.save(existing);
    }

    public void delete(Long id) {
        DanhMucLoaiHoSo existing = getById(id);
        repository.delete(existing);
    }
}
