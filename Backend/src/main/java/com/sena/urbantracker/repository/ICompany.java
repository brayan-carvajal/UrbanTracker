package com.sena.urbantracker.repository;

import com.sena.urbantracker.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompany extends JpaRepository<Company, String> {
}
