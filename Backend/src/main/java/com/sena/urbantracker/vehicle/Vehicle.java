package com.sena.urbantracker.vehicle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sena.urbantracker.company.Company;
import com.sena.urbantracker.model.User;
import com.sena.urbantracker.vehicleStatus.VehicleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String licencePlate;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @ManyToOne
    @JoinColumn(nullable = false)
    private VehicleStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Vehicle> vehicles;
}
