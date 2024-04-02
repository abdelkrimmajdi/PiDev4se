package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Image;
import com.example.vitanova.Service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@CrossOrigin("*")
public class ImageController {
    @Autowired
    private ImageServiceImpl imageService;
    @RequestMapping(value="/upload",method = RequestMethod.POST)
    public Image uploadImage(@RequestParam("image")MultipartFile file)throws IOException{
        return imageService.uploadImage(file);
    }
    @RequestMapping(value="/get/info/{id}",method = RequestMethod.GET)
    public Image getImage(@PathVariable("id")Long id)throws IOException{
        return imageService.getImageDetails(id);
    }
}
