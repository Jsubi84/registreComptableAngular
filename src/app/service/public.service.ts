import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../modelo/login';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  public Url: string = "";

  constructor(private http:HttpClient) {
      this.Url= environment.baseUrl + "login";
  }

  login(login: any){
    return this.http.post<LoginResponse>(this.Url, login);
  }
}
