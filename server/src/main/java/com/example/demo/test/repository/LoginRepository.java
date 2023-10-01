package com.example.demo.test.repository;

import com.example.demo.test.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {

    Login findByEmployeeId(Long employeeId);
}
