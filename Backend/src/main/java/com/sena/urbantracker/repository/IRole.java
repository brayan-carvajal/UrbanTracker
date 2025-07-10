package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRole extends JpaRepository<Role, String> {
}
