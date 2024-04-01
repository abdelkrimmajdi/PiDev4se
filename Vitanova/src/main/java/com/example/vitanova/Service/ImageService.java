package com.example.vitanova.Service;

import com.example.vitanova.Entities.Image;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    Image uploadImage(MultipartFile file) throws IOException;
    Image getImageDetails(Long id)throws IOException;
    ResponseEntity<byte[]>getImage (Long id )throws IOException;
    void deleteImage(Long id);
}
