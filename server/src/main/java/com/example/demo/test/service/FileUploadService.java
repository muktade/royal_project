package com.example.demo.test.service;


import com.example.demo.test.entity.FileUpload;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileUploadService {
    List<FileUpload> uploadFile(FileUpload fileUpload, MultipartFile file);

    List<FileUpload> getAllFile();
}
