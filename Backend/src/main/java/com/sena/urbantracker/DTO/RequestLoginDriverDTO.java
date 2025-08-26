package com.sena.urbantracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestLoginDriverDTO {
    private String driverID;
    private String password;
}
