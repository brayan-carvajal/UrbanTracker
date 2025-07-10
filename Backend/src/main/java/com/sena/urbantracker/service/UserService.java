package com.sena.urbantracker.service;

import com.sena.urbantracker.DTO.UserView;
import com.sena.urbantracker.repository.IUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class UserService {

    private IUser iUser;

    public List<UserView> getAllUsers(){
        return iUser.getAll();
    }
}
