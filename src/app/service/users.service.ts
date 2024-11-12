import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User, userResponse } from '../modelo/user';

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

  newUser(user:User){
    return this.http.post<userResponse>(this.Url+"/new", user);
  }

  deleteUser(u:User){
    return this.http.delete<User>(this.Url+"/"+u.id);
  }

  getUserId(id:number){
    return this.http.get<User>(this.Url+"/"+id);
  }

  updateUser(user: User){
    return this.http.put(this.Url+"/update/"+user.id, user);
  }
}
