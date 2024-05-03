package com.example.vitanova.Service;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.NutrisionisteProgramRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class NutritionisteServiceImpl implements NutritionisteService{
    @Autowired
    private NutrisionisteProgramRepository repository;
    @Autowired
    private UserRepository userRepository;
    public List<NutrisionistProgram> getAllNutrisionistPrograms() {
        return repository.findAll();
    }

    public NutrisionistProgram getNutrisionistProgramById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public NutrisionistProgram saveNutrisionistProgram(NutrisionistProgram nutrisionistProgram) {
        return repository.save(nutrisionistProgram);
    }
    public  List<NutrisionistProgram> getUserProgramById(Long id) {
        return repository.findByUserprogramId(id);
    }
    public void deleteNutrisionistProgram(Long id) {
        repository.deleteById(id);
    }
    public List<NutrisionistProgram> getProgramsByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
    public NutrisionistProgram create(NutrisionistProgram nutrisionistProgram, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            nutrisionistProgram.setUser(user);
            return repository.save(nutrisionistProgram);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID: " + userId);
        }
    }
        public NutrisionistProgram affectNutritionistProgramsToUser(Long programId, Long userId) {
            Optional<User> userOptional = userRepository.findById(userId);
            Optional<NutrisionistProgram> nutrisionistProgramOptional = repository.findById(programId);

            if (userOptional.isPresent() && nutrisionistProgramOptional.isPresent()) {
                User user = userOptional.get();
                NutrisionistProgram program = nutrisionistProgramOptional.get();
                program.setUserprogram(user);
                NutrisionistProgram savedProgram = repository.save(program);
                return savedProgram;
            } else {
                throw new RuntimeException("User Not Found");
            }
        }

    }




