package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoute extends JpaRepository<Route, String> {
}
