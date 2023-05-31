import { Component, OnInit} from '@angular/core';
import { RegistreService } from '../service/registre.service';

const mesosAny = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  displayedColumns: string[] = ['mes', 'ingres', 'despesa'];

  selected = 0;
  anys: number [] = [];
  totalDespesa: number = 0;
  totalIngres: number = 0;
  totalAny!: number[];


  constructor(private service:RegistreService){
    const anyPresent = new Date();

    this.anys.push(anyPresent.getFullYear());
    this.anys.push(anyPresent.getFullYear()-1);
    this.anys.push(anyPresent.getFullYear()+1);
    this.anys.sort();
    this.selected = Number(anyPresent.getFullYear());

    this.resumMesAny();
  }

  resumMesAny(){
    this.service.getSumaByTipus(true, this.selected).subscribe
    (data=> {
      //Mirar com posar les dades si arriba un array de dades
      this.totalIngres = Number(data)}
    )
    this.service.getSumaByTipus(false, this.selected).subscribe
    (data=> {
      this.totalDespesa = Number(data)}
    ) 
  }

  ngOnInit(): void {

  }


}
