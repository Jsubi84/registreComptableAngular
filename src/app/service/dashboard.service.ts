import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public isEdit:Boolean = false;
  public Url: string = "";
  private params = new HttpParams();

  constructor(private http:HttpClient) {
      this.Url= environment.apiUrl + "dashboard";
  }
  
  getResumAny(year:number){
    this.params = new HttpParams();
    this.params = this.params.set('year', year);
    return this.http.get(this.Url+"/getResumAny", { params: this.params});
  }

  getTotalCatByYear(year:number, idCat:number){
    this.params = new HttpParams();
    this.params = this.params.set('idCat', idCat);
    this.params = this.params.set('year', year);
    return this.http.get(this.Url+"/getTotalCatByYear", { params: this.params});
  }

  getTotalSubcatByYear(year:number, idSubcat:number){
    this.params = new HttpParams();
    this.params = this.params.set('diSubcat', idSubcat);
    this.params = this.params.set('year', year);
    return this.http.get(this.Url+"/getTotalSubcatByYear", { params: this.params});
  }

}
