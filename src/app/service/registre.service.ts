import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Registre } from '../modelo/registre'
import { Subcategoria } from '../modelo/subcategoria'
import { RegistreFilter } from '../modelo/registreFilter'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  public isEdit:Boolean = false;
  public Url: string = "";

  constructor(private http:HttpClient) {
      this.Url= environment.apiUrl + "registres";
  }
  
  getRegistre(){
    return this.http.get<Registre[]>(this.Url);
  }

  findAllWithSort(){
    return this.http.get<Registre[]>(this.Url+"/findAllWithSort");
  }

  createRegistre(registre:Registre){
    console.log(registre);
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

  ckRegistresToDeleteSubcategoria(id:number){
    return this.http.get(this.Url+"/ckDeleteSubcat?id="+id);
  }

  getRegistreRepeate(importReg:number, data:string, subcat:Subcategoria){
    let params = new HttpParams();
    params = params.set('importReg', importReg);
    params = params.set('data', data);
    params = params.set('subcatId', subcat.id);
    return this.http.get(this.Url+"/getRegistreRepeate", { params: params});
  }

  findAllPaged(page:number, size:number, sort:string){
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    params = params.set('sort', sort);
    return this.http.get(this.Url+"/paged", { params: params});
  }

  findAllFilter(rfilter: RegistreFilter){
    return this.http.post<RegistreFilter>(this.Url+"/getRegistreFilter", rfilter);
  }
}
