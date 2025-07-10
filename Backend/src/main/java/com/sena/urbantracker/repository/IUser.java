package com.sena.urbantracker.repository;

import com.sena.urbantracker.DTO.UserView;
import com.sena.urbantracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUser extends JpaRepository<User, String> {

    @Query("SELECT u.id, u.username, u.role FROM users u")
    List<UserView> getAll();
}
