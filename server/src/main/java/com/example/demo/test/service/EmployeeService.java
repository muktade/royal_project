package com.example.demo.test.service;


import com.example.demo.test.entity.Employee;

import java.util.Map;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    Employee findEmployee(String email);

    Employee checkAuth(Employee employee);
}
