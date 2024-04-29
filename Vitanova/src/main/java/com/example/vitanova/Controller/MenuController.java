package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MenuController {
    @Autowired
    private MenuService service;

    @GetMapping("/Program/{ProgramId}/Menu")
    public List<Menu> getMenuByProgramId(@PathVariable Long ProgramId) {
        return service.getMenuByProgramId(ProgramId);
    }

    @PostMapping("/SaveMenu")
    public Menu saveMenu(@RequestBody Menu menu, @RequestParam Long NutritionnisteProgram) {
        Menu savedProgram = service.create(menu, NutritionnisteProgram);
        return savedProgram;
    }
    @DeleteMapping("deleteMenu/{id}")
    public void deleteMenu(@PathVariable Long id) {
        service.getMenuByProgramId(id);
    }

}
