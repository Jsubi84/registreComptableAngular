import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subcategoria } from '../modelo/subcategoria'
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  
  public isEdit:Boolean = false;
  public Url: string = "";

  constructor(private http:HttpClient, private configService: ConfigService) {
    this.configService.getConfig().subscribe(config => {
      this.Url= config.apiUrl + "subcategories";
      }); 
  }
  
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

  ckSubCatToDeleteCategoria(id:number){
    return this.http.get(this.Url+"/ckDeleteCat?id="+id);
  }
}
