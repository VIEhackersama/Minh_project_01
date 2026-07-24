package com.school.records.modules.records.controller;

import com.school.records.modules.records.entity.ViTriLuuTru;
import com.school.records.modules.records.service.ViTriLuuTruService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vi-tri")
public class ViTriLuuTruController {

    @Autowired
    private ViTriLuuTruService service;

    @GetMapping
    public ResponseEntity<List<ViTriLuuTru>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/phong-kho")
    public ResponseEntity<List<String>> getDistinctPhongKho() {
        return ResponseEntity.ok(service.getDistinctPhongKho());
    }

    @GetMapping("/ke-hang")
    public ResponseEntity<List<String>> getDistinctKeHang(@RequestParam(value = "phongKho", required = false) String phongKho) {
        return ResponseEntity.ok(service.getDistinctKeHang(phongKho));
    }

    @GetMapping("/ngan-chua")
    public ResponseEntity<List<String>> getDistinctNganChua(
            @RequestParam(value = "phongKho", required = false) String phongKho,
            @RequestParam(value = "keHang", required = false) String keHang
    ) {
        return ResponseEntity.ok(service.getDistinctNganChua(phongKho, keHang));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViTriLuuTru> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<ViTriLuuTru> create(@RequestBody ViTriLuuTru entity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ViTriLuuTru> update(@PathVariable("id") Long id, @RequestBody ViTriLuuTru entity) {
        return ResponseEntity.ok(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
