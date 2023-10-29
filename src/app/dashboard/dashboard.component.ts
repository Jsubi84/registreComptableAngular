import { Component, OnInit } from '@angular/core';
import { RegistreService } from '../service/registre.service';
import { ResumAny } from 'src/app/modelo/resumAny';
import { Observable } from 'rxjs';

const mesosAny = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['mes', 'ingres', 'despesa'];

  configuracio!: Observable<any>;
  selected = 0;
  anys: number [] = [];
  public totalDespesa: number = 0;
  public totalIngres: number = 0;
  totalAny: ResumAny[] = [];

  visibleResum:Boolean = false;

  constructor(private service:RegistreService){
    const anyPresent = new Date();

    this.anys.push(anyPresent.getFullYear());
    this.anys.push(anyPresent.getFullYear()-1);
    this.anys.push(anyPresent.getFullYear()+1);
    this.anys.sort();
    this.selected = Number(anyPresent.getFullYear());   
  }

  ngOnInit(): void {
    this.actualitzaDades();
  }

  actualitzaDades(){
    this.totalDespesa = 0;
    this.totalIngres= 0;

    this.totalAny = [];

    for (let i = 0; i < 12; i++) {
      const row = {
        mes: mesosAny[i],
        ingres: +0,
        despesa: +0,
      }
      this.totalAny.push(row);
    }    
    this.service.getResumAny(this.selected).subscribe
    (data=> {
      const dades: number[] | any  = data;
        for (let i = 0; i < dades.length ; i++) {
          this.totalAny[dades[i][0]-1].ingres = dades[i][1] == null ? 0 : dades[i][1];
          this.totalIngres+= Number(dades[i][1]);
          this.totalAny[dades[i][0]-1].despesa= dades[i][2] == null ? 0 : dades[i][2];
          this.totalDespesa += Number(dades[i][2]);
        }
        const row = {
        mes: 'TOTALS',
        ingres: +this.totalIngres.toFixed(2),
        despesa: +this.totalDespesa.toFixed(2),
      }
      this.totalAny.push(row);  
      this.totalAny = [...this.totalAny];     
    });
  }
}
