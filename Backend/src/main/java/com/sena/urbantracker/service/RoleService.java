package com.sena.urbantracker.service;

import com.sena.urbantracker.model.Role;
import com.sena.urbantracker.repository.IRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final IRole iRole;

    public List<Role> getAllRoles(){
        return iRole.findAll();
    }
}
