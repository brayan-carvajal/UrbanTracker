package com.sena.urbantracker.repository;

import com.sena.urbantracker.DTO.UserViewDTO;
import com.sena.urbantracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IUser extends JpaRepository<User, Integer> {

    @Query("SELECT u.id, u.userName, u.role FROM users u")
    List<UserViewDTO> getAll();

    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String username);
}
