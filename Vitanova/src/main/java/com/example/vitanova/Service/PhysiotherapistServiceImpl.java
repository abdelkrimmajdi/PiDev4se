package com.example.vitanova.Service;

import com.example.vitanova.Entities.Physiotherapist;
import com.example.vitanova.Repositorie.PhysiotherapistRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhysiotherapistServiceImpl implements PhysiotherapistService {
    @Autowired
    private PhysiotherapistRepositorie physiotherapistRepository;

    @Override
    public List<Physiotherapist> getAllPhysiotherapists() {
        return physiotherapistRepository.findAll();
    }

    @Override
    public Physiotherapist getPhysiotherapistById(Long id) {
        Optional<Physiotherapist> optionalPhysiotherapist = physiotherapistRepository.findById(id);
        return optionalPhysiotherapist.orElse(null);
    }

    @Override
    public Physiotherapist createPhysiotherapist(Physiotherapist physiotherapist) {
        return physiotherapistRepository.save(physiotherapist);
    }

    @Override
    public Physiotherapist updatePhysiotherapist(Long id, Physiotherapist physiotherapist) {
        Optional<Physiotherapist> optionalPhysiotherapist = physiotherapistRepository.findById(id);
        if (optionalPhysiotherapist.isPresent()) {
            Physiotherapist existingPhysiotherapist = optionalPhysiotherapist.get();
            existingPhysiotherapist.setPhyname(physiotherapist.getPhyname());
            existingPhysiotherapist.setLatitude(physiotherapist.getLatitude());
            existingPhysiotherapist.setLongitude(physiotherapist.getLongitude());
            return physiotherapistRepository.save(existingPhysiotherapist);
        } else {
            return null;
        }
    }

    @Override
    public void deletePhysiotherapist(Long id) {
        physiotherapistRepository.deleteById(id);
    }
}
