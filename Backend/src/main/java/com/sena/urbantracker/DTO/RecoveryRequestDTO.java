package com.sena.urbantracker.DTO;

import com.sena.urbantracker.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecoveryRequestDTO {
    private int id;
    private String email;
    private String token;
    private Integer expirationTime;
    private Integer user;
}
