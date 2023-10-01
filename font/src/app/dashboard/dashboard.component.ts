import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  email: any;
  employee: any;

  time: any;
  lastLoginTime: any;

  fileUploadForm: any = this.fb.group({
    description: '',
    file: ''
  });

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.time = this.timeStampToDate(new Date().getTime());
  }

  ngOnInit(): void {
    this.loadAllFile();
    this.lastLoginTime = localStorage.getItem('time');
    if (this.lastLoginTime != 'null') {
      this.lastLoginTime = this.timeStampToDate(this.lastLoginTime);
    } else {
      this.lastLoginTime = 'New User.';
    }
    this.email = localStorage.getItem('email');
    if (this.email != null) {
      this.getEmployeeDetails();
      this.router.navigate(['/dashboard']);
    } else {
      alert("Sorry your are not aurthorized!\nLogin 1st...")
      this.router.navigate(['/login']);
    }
  }
  timeStampToDate(lastLoginTime: any): any {
    debugger;
    var theDate = new Date(lastLoginTime * 1)
    let dateString = theDate.toDateString();
    return dateString;
  }

  getEmployeeDetails() {
    this.api.getRequest(`find-employee/${this.email}`).subscribe((res: any) => {
      debugger;
      this.employee = res[0];
    });
  }

  fileupload: any = [];

  selectFile(event: any) {
    this.fileupload = [];
    this.fileupload.push(event.target.files[0]);
  }
  uploadFile() {
    let formData: FormData = new FormData();
    debugger
    formData.append('description', this.fileUploadForm.value.description);
    // formData.append('file', this.fileUploadForm.value.file);
    this.fileupload.forEach((element: any) => {
      formData.append('file', element);

    });
    this.api.postRequest("upload", formData).subscribe((res: any) => {
      debugger
      console.log(res);
      alert(res.msg);

    }, (err) => {
      console.log(err);

      alert('Sorry error happend: ' + err);
    })
  }

  fileList: any;
  loadAllFile() {
    this.api.getRequest('all-file').subscribe(res => {
      this.fileList = res;
    })
  }

  jt(){
    file
  }

  empLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
