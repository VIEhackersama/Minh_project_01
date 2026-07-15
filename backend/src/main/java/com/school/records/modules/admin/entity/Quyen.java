package com.school.records.modules.admin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quyen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quyen {
    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "ten_quyen", nullable = false, length = 100)
    private String tenQuyen;

    @Column(columnDefinition = "TEXT")
    private String moTa;
}
