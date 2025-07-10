package com.sena.urbantracker.service;

import com.sena.urbantracker.model.Vehicle;
import com.sena.urbantracker.repository.IVehicle;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class VehicleService {

    private IVehicle iVehicle;

    public List<Vehicle> getAllVehicles(){
        return iVehicle.findAll();
    }
}
