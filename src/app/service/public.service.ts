import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../modelo/login';
import { HttpHeaders } from "@angular/common/http";

const headers = new HttpHeaders()
.set('Content-Type', 'application/json; charset=utf-8')
.set("Accept", 'application/json')
.set("Access-Control-Allow-Origin", '*');

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  public Url: string = "";

  constructor(private http:HttpClient) {
      this.Url= environment.baseUrl + "login";
  }

  login(login: any){
    return this.http.post<LoginResponse>(this.Url, login, {headers: headers, responseType: 'json' });
  }
}
