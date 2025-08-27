package com.sena.urbantracker.DTO;

import com.sena.urbantracker.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserViewDTO {

    private String id;
    private String username;
    private Integer role;

}
