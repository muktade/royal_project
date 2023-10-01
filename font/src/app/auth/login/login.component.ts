import {Component} from '@angular/core';
import {Employee} from "../../service/Employee";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {CommonConstants} from "../../service/CommonConstants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  employee?: Employee;
  loginForm : any = FormBuilder;
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) {
    const email = localStorage.getItem('email');
    if (email != null) {
      this.router.navigate(['/dashboard']);
    }
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(CommonConstants.emailRegex)],],
      password: ['', [Validators.required],]
    });
  }


  login() {
    const formValue = this.loginForm.value;
    this.employee = formValue;
    debugger
    this.api.postRequest('login', this.employee).subscribe((res: any) => {
      debugger
      const msg = res.msg;
      if (msg.match('email is not found')) {
        alert(msg);
      } else if (msg.match("Password is match")) {
        alert("login success");
        localStorage.setItem('time', JSON.stringify(res.logInfo.loginTime));
        localStorage.setItem('email', JSON.stringify(this.employee?.email));
        this.router.navigate(['/dashboard']);
      } else if (msg.match('Password is not match')) {
        alert(msg);
      } else if (msg.match("something is not ok")) {
        alert(msg);
      } else {
        alert("Sorry we can't Log In");
      }
    });
  }

}
