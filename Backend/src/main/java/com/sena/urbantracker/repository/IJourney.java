package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.Journey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJourney extends JpaRepository<Journey, String> {
}
