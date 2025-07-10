package com.sena.urbantracker.service;

import com.sena.urbantracker.model.Role;
import com.sena.urbantracker.repository.IRole;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class RoleService {

    private IRole iRole;

    public List<Role> getAllRoles(){
        return iRole.findAll();
    }
}
