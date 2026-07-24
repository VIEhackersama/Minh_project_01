package com.school.records.modules.records.controller;

import com.school.records.modules.records.entity.DanhMucLoaiHoSo;
import com.school.records.modules.records.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/danh-muc")
public class DanhMucController {

    @Autowired
    private DanhMucService service;

    @GetMapping
    public ResponseEntity<List<DanhMucLoaiHoSo>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanhMucLoaiHoSo> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<DanhMucLoaiHoSo> create(@RequestBody DanhMucLoaiHoSo entity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DanhMucLoaiHoSo> update(@PathVariable("id") Long id, @RequestBody DanhMucLoaiHoSo entity) {
        return ResponseEntity.ok(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
