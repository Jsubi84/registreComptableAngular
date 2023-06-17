import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Registre } from '../modelo/registre'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  public isEdit:Boolean = false;

  constructor(private http:HttpClient) {
  }

  Url='http://localhost:8080/api/v1/registres';
  
  getRegistre(){
    return this.http.get<Registre[]>(this.Url);
  }

  createRegistre(registre:Registre){
    return this.http.post<Registre>(this.Url, registre);
  }

  getRegistreId(id:number){
    return this.http.get<Registre>(this.Url+"/"+id);
  }

  updateRegistre(registre:Registre){
    return this.http.put<Registre>(this.Url+"/"+registre.id, registre);
  }

  deleteRegistre(r:Registre){
    return this.http.delete<Registre>(this.Url+"/"+r.id);
  }

  getSumaByTipus(tipus:Boolean, year:number): Observable<any>{
    return this.http.get(this.Url+"/getSumaByTipus?tipus="+tipus+"&year="+year);
  }

  getResumAny(year:number){
    return this.http.get(this.Url+"/getResumAny?year="+year);
  }
}
