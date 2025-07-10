package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehicle extends JpaRepository<Vehicle, String> {
}
