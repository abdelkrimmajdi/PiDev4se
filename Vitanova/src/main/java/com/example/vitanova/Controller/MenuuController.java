package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Service.MenuService;
import com.example.vitanova.Service.NutritionisteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MenuuController {
    @Autowired
    private MenuService service;

    @GetMapping("/user/{ProgramId}/Menu")
    public List<Menu> getMenuByProgramId(@PathVariable Long ProgramId) {
        return service.getMenuByProgramId(ProgramId);
    }

    @PostMapping("/SaveMenu")
    public Menu saveMenu(@RequestBody Menu menu, @RequestParam Long NutritionnisteProgram) {
        Menu savedProgram = service.create(menu, NutritionnisteProgram);
        return savedProgram;
    }

}
