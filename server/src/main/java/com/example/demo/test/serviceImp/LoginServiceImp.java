package com.example.demo.test.serviceImp;

import com.example.demo.test.entity.Login;
import com.example.demo.test.repository.LoginRepository;
import com.example.demo.test.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImp implements LoginService {

    @Autowired
    LoginRepository loginRepository;

    @Override
    public Login saveLogin(Login login) {
        return loginRepository.save(login);
    }

    @Override
    public Login getLoginInfo(Long employeeId) {
        Login login = loginRepository.findByEmployeeId(employeeId);
        return login;
    }
}
