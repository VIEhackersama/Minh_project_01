package com.school.records.modules.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Map<String, Object> checkHealth() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        
        try {
            // Executing simple query to verify database connection
            Integer val = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (val != null && val == 1) {
                status.put("database", "CONNECTED");
                
                // Fetch the count of records in the 'quyen' table to verify seeds ran
                Integer rolesCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM vai_tro", Integer.class);
                status.put("roles_seeded", rolesCount);
            } else {
                status.put("database", "UNHEALTHY");
            }
        } catch (Exception e) {
            status.put("database", "DISCONNECTED");
            status.put("error", e.getMessage());
        }
        
        return status;
    }
}
