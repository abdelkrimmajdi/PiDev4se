package com.example.vitanova.Service;

import com.example.vitanova.Entities.Menu;

import java.util.List;

public interface MenuService {
    public Menu create(Menu men, Long programId);
    public void deleteMenu(Long id);
    public List<Menu> getMenuByProgramId(Long ProgramId);
}
