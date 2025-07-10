package com.sena.urbantracker.service;


import com.sena.urbantracker.model.Company;
import com.sena.urbantracker.repository.ICompany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class CompanyService {

    private ICompany iCompany;

    public List<Company> getAllCompanies(){
        return iCompany.findAll();
    }
}
