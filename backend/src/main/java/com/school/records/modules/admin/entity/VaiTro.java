package com.school.records.modules.admin.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "vai_tro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VaiTro {
    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "ten_vai_tro", nullable = false, length = 100)
    private String tenVaiTro;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "vai_tro_quyen",
        joinColumns = @JoinColumn(name = "vai_tro_id"),
        inverseJoinColumns = @JoinColumn(name = "quyen_id")
    )
    private Set<Quyen> quyen;
}
