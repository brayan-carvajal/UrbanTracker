package com.sena.urbantracker.vehicle;

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
