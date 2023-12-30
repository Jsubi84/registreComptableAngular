import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ResumAny } from 'src/app/modelo/resumAny';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { Categoria } from 'src/app/modelo/categoria';
import { SubcategoriaService } from '../service/subcategoria.service';
import { RegistreService } from '../service/registre.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const mesosAny = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 // displayedColumns: string[] = ['mes', 'ingres', 'despesa'];

  chart : any = null

  selected = 0;
  anys: number [] = [];
  public totalDespesa: number = 0;
  public totalIngres: number = 0;
  //totalAny: ResumAny[] = [];

  dataDespesa: number[] = [];
  dataIngres: number[] = [];

  categories!:Categoria[];
  categoriesMemory!:Categoria[];
  myControlCat= new FormControl<string | Categoria>('');
  optionsCat!:Categoria[];
  optionsBuitCat!:Categoria[];
  filteredOptionsCat!: Observable<Categoria[]>;

  subcategories!:Subcategoria[];
  subcategoriesMemory!:Subcategoria[];
  myControlSub = new FormControl<string | Subcategoria>('');
  optionsSub!:Subcategoria[];
  optionsBuitSub!:Subcategoria[];
  filteredOptionsSub!: Observable<Subcategoria[]>;

  visibleResum:Boolean = true;
  constructor(private service:DashboardService, private serviceCat:CategoriaService, private serviceReg: RegistreService, private serviceSub:SubcategoriaService ){}

  ngOnInit(): void {


    const anyPresent = new Date();

    this.anys.push(anyPresent.getFullYear());
    this.anys.push(anyPresent.getFullYear()-1);
    this.anys.push(anyPresent.getFullYear()+1);
    this.anys.sort();
    this.selected = Number(anyPresent.getFullYear());   

    this.actualitzaResumAny();
    this.resumTotal();

    this.serviceSub.getSubcategorias().subscribe
    (data=>{
      this.optionsSub = data;
    })    
    this.filteredOptionsSub = this.myControlSub.valueChanges.pipe(
      startWith(''),
      map(value => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filterSub(nom as string) : this.optionsBuitSub;
    }),
  );

  this.serviceCat.getCategorias().subscribe
    (data=>{
      this.optionsCat = data;
    })    
    this.filteredOptionsCat = this.myControlCat.valueChanges.pipe(
      startWith(''),
      map(value => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filterCat(nom as string) : this.optionsBuitCat;
    }),
    );
  }

  actualitzaResumAny(){
    this.totalDespesa = 0;
    this.totalIngres= 0;
    this.dataIngres= []
    this.dataDespesa= []

    for (let i = 0; i < 12; i++) {
      this.dataIngres.push(+0);
      this.dataDespesa.push(+0);
    }    

    this.service.getResumAny(this.selected).subscribe
    (data=> {
      const dades: number[] | any  = data;
      for (let i = 0; i < dades.length ; i++) {
        this.dataIngres[dades[i][0]-1] = dades[i][1] == null ? 0 : dades[i][1];
        this.totalIngres+= Number(dades[i][1]);
        this.dataDespesa[dades[i][0]-1]= dades[i][2] == null ? 0 : dades[i][2];
        this.totalDespesa += Number(dades[i][2]);
      }
      // for (let i = 0; i < dades.length ; i++) {
      //   this.totalAny[dades[i][0]-1].ingres = dades[i][1] == null ? 0 : dades[i][1];
      //   this.totalIngres+= Number(dades[i][1]);
      //   this.totalAny[dades[i][0]-1].despesa= dades[i][2] == null ? 0 : dades[i][2];
      //   this.totalDespesa += Number(dades[i][2]);
      // }
      // const row = {
      // mes: 'TOTALS',
      // ingres: +this.totalIngres.toFixed(2),
      // despesa: +this.totalDespesa.toFixed(2),
      // }
      // this.totalAny.push(row);  
      //this.totalAny = [...this.totalAny];   

      this.dataIngres = [...this.dataIngres ];
      this.dataDespesa = [...this.dataDespesa ];
      this.resumTotal();
    });
  }

  resumTotal(){
    if (this.chart != null){
      this.chart.destroy();
    }
    this.chart = new Chart( 'yearTotals', {
    type: 'bar',
    data: {
      labels: mesosAny,
      datasets: [
        {
          label: 'Despesa',
          data: this.dataDespesa,
          borderWidth: 2,
          borderRadius: 7,
        },
        {
          label: 'Ingres',
          data: this.dataIngres,
          borderWidth: 2,
          borderRadius: 7,
        }       
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      layout: {
        padding:{
          top:10,
          left:50,
          right:50,
          bottom:10
        } 
      }
    },
  });

  //this.chart.resize(500, 1000);
  }

//--------------
  //SUBCATEGORIES
//--------------

  actualitzaSubcategories(){
    this.service.getSubcatByYearMonth(2023, 18, 6).subscribe
    (data=> {

    });
  }

  public onChangeSubcategory(sub : Subcategoria){
    //TODO fer calculs quan hi ha una subcategoria seleccionada
  }

  displayFnSub(sub: Subcategoria): string {
    if (sub.id == 0) {
      return "";
    }else{
      return sub && sub.id+'_'+sub.nom ? sub.id+'_'+sub.nom : '';
    }
  }

  private _filterSub(nom: string): any[] {
    const filterValueSub = nom.toLowerCase();
    return this.optionsSub.filter(option => option.nom.toLowerCase().includes(filterValueSub));
  }

  resetFiltresSub(){
    this.myControlSub.reset();
    this.myControlSub.setValue("");
    this.subcategories = this.subcategoriesMemory;
  }

//--------------
  //CATEGORIES
//--------------
  
  actualitzaCategories(){
    this.service.getCatByYearMonth(2023, 9, 8).subscribe
    (data=> {
      
    });
  }

  public onChangeCategory(cat : Categoria){
    //TODO fer calculs quan hi ha una subcategoria seleccionada
  }

  displayFnCat(cat: Categoria): string {
    if (cat.id == 0) {
      return "";
    }else{
      return cat && cat.id+'_'+cat.nom ? cat.id+'_'+cat.nom : '';
    }
  }

  private _filterCat(nom: string): any[] {
    const filterValueCat = nom.toLowerCase();
    return this.optionsCat.filter(option => option.nom.toLowerCase().includes(filterValueCat));
  }

  resetFiltresCat(){
    this.myControlCat.reset();
    this.myControlCat.setValue("");
    this.categories = this.categoriesMemory;
  }
}
