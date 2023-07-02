import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Categoria } from '../modelo/categoria'
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public isEdit:Boolean = false;
  public Url: string = "";

  constructor(private http:HttpClient, private configService: ConfigService) {
    this.configService.getConfig().subscribe(config => {
    this.Url= config.apiUrl + "categories";
    });    
  }

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
