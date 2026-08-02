package com.school.records.modules.reports.controller;

import com.school.records.modules.reports.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        return ResponseEntity.ok(reportService.getSummary());
    }

    @GetMapping("/inventory/category")
    public ResponseEntity<?> getInventoryByCategory() {
        return ResponseEntity.ok(reportService.getInventoryByCategory());
    }

    @GetMapping("/inventory/location")
    public ResponseEntity<?> getInventoryByLocation() {
        return ResponseEntity.ok(reportService.getInventoryByLocation());
    }

    @GetMapping("/loans")
    public ResponseEntity<?> getLoanStats() {
        return ResponseEntity.ok(reportService.getLoanStats());
    }
}
