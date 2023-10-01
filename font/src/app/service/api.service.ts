import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8088/emp/';
  constructor(private http : HttpClient) { }

  getRequest(url:any){
    return this.http.get(`${this.BASE_URL}${url}`).pipe(map (response=>{
      return response;
    }));
  }

  postRequest(url : any, value:any){
    return this.http.post(`${this.BASE_URL}${url}`, value).pipe(map (response => {
      return response;
    }));
  }
}
