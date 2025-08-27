package com.sena.urbantracker.service;

import com.sena.urbantracker.model.Journey;
import com.sena.urbantracker.repository.IJourney;
import com.sena.urbantracker.repository.IRoute;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JourneyService {

    private IJourney iJourney;

    public List<Journey> getAllJourneys(){
        return iJourney.findAll();
    }
}
