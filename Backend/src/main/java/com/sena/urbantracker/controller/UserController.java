package com.sena.urbantracker.controller;

import com.sena.urbantracker.DTO.UserView;
import com.sena.urbantracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final  UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        return  ResponseEntity.ok(userService.getAllUsers());
    }
}

