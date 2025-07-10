package com.sena.urbantracker.service;

import com.sena.urbantracker.model.Route;
import com.sena.urbantracker.repository.IRoute;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class RouteService {

    private IRoute iRoute;

    public List<Route> getAllRoutes(){
        return iRoute.findAll();
    }
}
