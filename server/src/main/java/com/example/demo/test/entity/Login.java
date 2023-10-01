package com.example.demo.test.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Table(name="login_info")
@Entity
@Data
public class Login {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loginId;

    @Column(name = "employee_id")
    private long employeeId;

    @Column(name = "login_time")
    private Date loginTime;


    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public void setLoginId(long loginId) {
        this.loginId = loginId;
    }

    public long getLoginId() {
        return loginId;
    }
}
