import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Categoria } from '../modelo/categoria'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public isEdit:Boolean = false;

  constructor(private http:HttpClient) {
  }

  Url='http://localhost:8080/api/v1/categories';
  
  getCategorias(){
    return this.http.get<Categoria[]>(this.Url);
  }

  createCategoria(categoria:Categoria){
    return this.http.post<Categoria>(this.Url, categoria);
  }

  getCategoriaId(id:number){
    return this.http.get<Categoria>(this.Url+"/"+id);
  }

  updateCategoria(categoria:Categoria){
    return this.http.put<Categoria>(this.Url+"/"+categoria.id, categoria);
  }

  deleteCategoria(c:Categoria){
    return this.http.delete<Categoria>(this.Url+"/"+c.id);
  }
}
