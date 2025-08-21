package com.sena.urbantracker.controller;

import com.sena.urbantracker.DTO.RoleDTO;
import com.sena.urbantracker.DTO.responseDTO;
import com.sena.urbantracker.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PostMapping("/")
    public ResponseEntity<Object> createRole(@RequestBody RoleDTO roleDTO) {
        responseDTO response = roleService.save(roleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable int id) {
        responseDTO response = roleService.deleteRole(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
