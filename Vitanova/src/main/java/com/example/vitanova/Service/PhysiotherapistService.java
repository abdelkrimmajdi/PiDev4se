package com.example.vitanova.Service;

import com.example.vitanova.Entities.Physiotherapist;

import java.util.List;

public interface PhysiotherapistService {
    List<Physiotherapist> getAllPhysiotherapists();
    Physiotherapist getPhysiotherapistById(Long id);
    Physiotherapist createPhysiotherapist(Physiotherapist physiotherapist);
    Physiotherapist updatePhysiotherapist(Long id, Physiotherapist physiotherapist);
    void deletePhysiotherapist(Long id);
}
