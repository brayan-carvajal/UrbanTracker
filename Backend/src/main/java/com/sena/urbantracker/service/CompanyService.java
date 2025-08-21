package com.sena.urbantracker.service;


import com.sena.urbantracker.repository.ICompany;
import com.sena.urbantracker.model.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final ICompany iCompany;

    public List<Company> getAllCompanies(){
        return iCompany.findAll();
    }
}
