import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subcategoria } from '../modelo/subcategoria'

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  
  public isEdit:Boolean = false;

  constructor(private http:HttpClient) {
  }

  Url='http://localhost:8080/api/v1/subcategories';
  
  getSubcategorias(){
    return this.http.get<Subcategoria[]>(this.Url);
  }

  createSubcategoria(subcategoria:Subcategoria){
    return this.http.post<Subcategoria>(this.Url, subcategoria);
  }

  getSubcategoriaId(id:number){
    return this.http.get<Subcategoria>(this.Url+"/"+id);
  }

  updateSubcategoria(subcategoria:Subcategoria){
    return this.http.put<Subcategoria>(this.Url+"/"+subcategoria.id, subcategoria);
  }

  deleteSubcategoria(s:Subcategoria){
    return this.http.delete<Subcategoria>(this.Url+"/"+s.id);
  }
}
