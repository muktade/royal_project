package com.example.demo.test.controller;


import com.example.demo.test.entity.Employee;
import com.example.demo.test.entity.FileUpload;
import com.example.demo.test.service.EmployeeService;
import com.example.demo.test.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/emp/")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private FileUploadService fileUploadService;


    @PostMapping("save")
    public Map<String,String> save(@RequestBody Employee employee) {

        String res = "";
        Employee emp = employeeService.findEmployee(employee.getEmail());
        Map<String,String> result = new HashMap<String,String>();
        if (emp != null) {
            res = "Email is already added.";
        } else {
            res = "Employee created successfully.";
            employeeService.saveEmployee(employee);
        }
        result.put("message",res);
        return result;
    }

    @PostMapping("login")
    public Employee loginEmployee(@RequestBody Employee employee) {
        return employeeService.checkAuth(employee);
    }

    @GetMapping(value = "find-employee/{email}")
    public List<Employee> getEmployeeDetails(@PathVariable(name = "email") String  email){
        List<Employee> employees = new ArrayList<>();
        String eml = email.replace("\"", "");
        Employee emp = employeeService.findEmployee(eml);
        employees.add(emp);
        return employees;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    public @ResponseBody List<FileUpload> uploadFile(@ModelAttribute FileUpload fileUpload, @RequestParam(value ="file")MultipartFile file)throws Exception{
        return fileUploadService.uploadFile(fileUpload, file);
    }

    @GetMapping("all-file")
    public List<FileUpload> getAllFile(){
        return fileUploadService.getAllFile();
    }

}
