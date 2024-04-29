package com.example.vitanova.Service;

import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.MenuRepository;
import com.example.vitanova.Repositorie.NutrisionisteProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private NutrisionisteProgramRepository nutrisionisteProgramRepository;

    public Menu create(Menu men, Long programId) {
        Optional<NutrisionistProgram> nutrisionistProgram = nutrisionisteProgramRepository.findById(programId);
        if (nutrisionistProgram.isPresent()) {
            NutrisionistProgram menuu = nutrisionistProgram.get();

            men.setNutrisionistprogram(menuu);
            return menuRepository.save(men);
        }
    return  null;

    }
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
    public List<Menu> getMenuByProgramId(Long ProgramId) {
        return menuRepository.findByNutrisionistProgramId(ProgramId);
    }

}