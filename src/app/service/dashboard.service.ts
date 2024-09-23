import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
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
    this.params = this.params.set('idSubcat', idSubcat);
    this.params = this.params.set('year', year);
    return this.http.get(this.Url+"/getTotalSubcatByYear", { params: this.params});
  }

  getCatByYearMonth(year:number, idCat:number, month:number){
    this.params = new HttpParams();
    this.params = this.params.set('idCat', idCat);
    this.params = this.params.set('year', year);
    this.params = this.params.set('month', month);
    return this.http.get(this.Url+"/getCatByYearMonth", { params: this.params});
  }

  getSubcatByYearMonth(year:number, idSubcat:number, month:number){
    this.params = new HttpParams();
    this.params = this.params.set('idSubcat', idSubcat);
    this.params = this.params.set('year', year);
    this.params = this.params.set('month', month);
    return this.http.get(this.Url+"/getSubcatByYearMonth", { params: this.params});
  }

}
