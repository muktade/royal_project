package com.example.demo.test.service;


import com.example.demo.test.entity.Login;

public interface LoginService {

    Login saveLogin(Login login);

    Login getLoginInfo(Long employeeId);



}
