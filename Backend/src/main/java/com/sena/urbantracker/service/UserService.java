package com.sena.urbantracker.service;

import com.sena.urbantracker.DTO.UserViewDTO;
import com.sena.urbantracker.repository.IUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final IUser iUser;

    public List<UserViewDTO> getAllUsers(){
        return iUser.getAll();
    }
}
