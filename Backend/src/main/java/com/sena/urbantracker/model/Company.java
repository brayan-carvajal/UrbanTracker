package com.sena.urbantracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nit;

    @Column(nullable = false)
    private String address;

    @Column(name = "contact_phone",nullable = false)
    private String contactPhone;

    @Column(name = "contact_email",nullable = false)
    private String contactEmail;

    private boolean active = true;

    @Column(name = "create_at", nullable = false,  updatable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Vehicle> vehicles;
}
