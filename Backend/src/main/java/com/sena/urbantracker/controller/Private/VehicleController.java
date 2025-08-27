package com.sena.urbantracker.controller.Private;

import com.sena.urbantracker.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vehicle")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping("/")
    public ResponseEntity<?> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }
}
