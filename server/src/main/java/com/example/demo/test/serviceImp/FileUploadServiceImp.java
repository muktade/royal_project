package com.example.demo.test.serviceImp;

import com.example.demo.test.entity.FileUpload;
import com.example.demo.test.repository.FileUploadRepository;
import com.example.demo.test.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
public class FileUploadServiceImp implements FileUploadService {
    private String basePath = "server\\src\\main\\resources";

    @Autowired
    FileUploadRepository fileUploadRepository;

    @Override
    public List<FileUpload> uploadFile(FileUpload fileUpload, MultipartFile file) {
        try {
            makDir(basePath);
            File sFile = new File(basePath + "\\" + file.getOriginalFilename());

            InputStream in = new ByteArrayInputStream(file.getBytes());
            System.out.println("path : " + sFile.getAbsolutePath());
            Files.copy(in, Path.of(sFile.getAbsolutePath()));
            fileUpload.setFilePath(sFile.getAbsolutePath());
            fileUploadRepository.save(fileUpload);
        } catch (Exception e) {
            System.out.println(e);
        }
        return fileUploadRepository.findAll();
    }

    @Override
    public List<FileUpload> getAllFile() {
        return fileUploadRepository.findAll();
    }

    public static void makDir(String dir) {
        if (dir != null) {
            File d = new File(dir);
            if (!d.exists()) {
                d.mkdirs();
            }
        }
    }
}
