package com.sena.urbantracker.company;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sena.urbantracker.vehicle.Vehicle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
