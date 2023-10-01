import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../service/api.service";
import { Router } from "@angular/router";
import { Employee } from "../../service/Employee";
import { CommonConstants } from '../../service/CommonConstants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: any = FormBuilder;

  employee?: Employee;
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) {
    const email = localStorage.getItem('email');
    if (email != null) {
      this.router.navigate(['/dashboard']);
    }
  }



  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(CommonConstants.nameRegex)],],
      loginName: ['', [Validators.required, Validators.pattern(CommonConstants.nameRegex)],],
      email: ['', [Validators.required, Validators.pattern(CommonConstants.emailRegex)],],
      password: ['', [Validators.required, Validators.pattern(CommonConstants.passwordRegex)],],
      conPass: ['', [Validators.required],],
      address: '',
      dob: ''
    });
  }

  signUp() {
    const formValue = this.registrationForm.value;
    this.employee = formValue;
    console.log(this.employee);

    if (this.employee?.password === formValue.conPass) {

      this.api.postRequest('save', this.employee).subscribe((response: any) => {
        console.log(response);
        this.registrationForm.reset();
        const msg = response.message;
        if (msg.match('Email is already added.')) {
          alert(msg);
        } else if (msg.match('Employee created successfully.')) {
          alert(msg);
          this.router.navigate(['/login']);
        } else {
          alert("Sorry we can't Log In");
        }

      });

    } else {
      alert("Password not match...")
    }
  }

}
