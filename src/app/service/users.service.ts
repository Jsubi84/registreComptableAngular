import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../modelo/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  public isEdit:Boolean = false;
  public Url: string = "";

  constructor(private http:HttpClient) {
      this.Url= environment.apiUrl + "users";
  }
  
  getAllUsers(){
    return this.http.get<User[]>(this.Url);
  }
}
