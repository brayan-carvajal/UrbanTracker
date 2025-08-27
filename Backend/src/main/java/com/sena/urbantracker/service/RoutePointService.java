package com.sena.urbantracker.service;

import com.sena.urbantracker.model.RoutePoint;
import com.sena.urbantracker.repository.IRoutePoint;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutePointService {

    private IRoutePoint iRoutePoint;

    public List<RoutePoint> getAllRoutePoints(){
        return iRoutePoint.findAll();
    }
}
