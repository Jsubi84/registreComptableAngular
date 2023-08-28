import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Registre } from '../modelo/registre'
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  public isEdit:Boolean = false;
  public Url: string = "";

  constructor(private http:HttpClient, private configService: ConfigService) {
    this.configService.getConfig().subscribe(config => {
      this.Url= config.apiUrl + "registres";
      }); 
  }
  
  getRegistre(){
    return this.http.get<Registre[]>(this.Url);
  }

  findAllRegWithSort(){
    return this.http.get<Registre[]>(this.Url+"/findAllRegWithSort");
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

  ckRegistresToDeleteSubcategoria(id:number){
    return this.http.get(this.Url+"/ckDeleteSubcat?id="+id);
  }
}
