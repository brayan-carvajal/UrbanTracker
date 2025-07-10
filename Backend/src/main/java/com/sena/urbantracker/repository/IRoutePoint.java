package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.RoutePoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoutePoint extends JpaRepository<RoutePoint, String> {
}
