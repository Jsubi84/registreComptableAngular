import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { Registre } from 'src/app/modelo/registre';
import { Categoria } from 'src/app/modelo/categoria';
import { SubcategoriaService } from '../../service/subcategoria.service';
import { RegistreService } from '../../service/registre.service';
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

  //Seleccions parcials
  selected : number = -1;  // any seleccionat

  selectedMesSub : number = -1;
  selectedSubcategoriaId: number = -1;
  totalSub: number = 0;
  regSubParcials:Registre[]= []; 
  tRegSubParcials: number = 0;

  selectedMesCat : number = -1;
  selectedCategoriaId : number = -1;
  totalCat : number = 0;
  regCatParcials:Registre[] = [];
  tRegCatParcials: number = 0;

  anys: number [] = [];
  public totalDespesa: number = 0;
  public totalIngres: number = 0;
  public totalDif: number = 0;
  mesosAny : string[] = mesosAny;

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

  mobil: Boolean = false;

  grafic: boolean = false;
  
  displayedColumns: string[] = ['data', 'import'];

  constructor(private service:DashboardService, private serviceCat:CategoriaService, private serviceReg: RegistreService, private serviceSub:SubcategoriaService ){}

  ngOnInit(): void {

    this.grafic = true;
    window.innerWidth > 600 ? this.mobil = false : this.mobil = true; 

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

      this.dataIngres = [...this.dataIngres ];
      this.dataDespesa = [...this.dataDespesa ];
      
      this.resumTotal();
      this.totalDif = this.totalIngres - this.totalDespesa;
      this.resetFiltresSub()
      this.resetFiltresCat()
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
            left:30,
            right:30,
            bottom:10
          } 
        }
      },
    });
  }

  //--------------
  //SUBCATEGORIES
  //--------------

  public onChangeSubcategory(sub : Subcategoria){
    this.selectedSubcategoriaId = sub.id;
    this.service.getTotalSubcatByYear(this.selected, sub.id).subscribe
    (data=> {
      this.totalSub = +data;
    });
    if (this.selectedMesSub != -1){
      this.selectMesSubChange()
    }
  }

  selectMesSubChange(){
    this.tRegSubParcials = 0
    if (this.selectedSubcategoriaId != -1 ) {
      this.service.getSubcatByYearMonth(this.selected, this.selectedSubcategoriaId, this.selectedMesSub+1).subscribe
      (data=> {
        let dades : Registre | any = data;
        this.regSubParcials = dades;
        if (this.regSubParcials.length != 0){
          this.regSubParcials.forEach(reg =>  {
            this.tRegSubParcials += reg.importreg
          });          
        }
      });  
    }
  }

  displayFnSub(sub: Subcategoria): string {
    if(sub != null){
      if (sub.id == 0) {
        return "";
      }else{
        return sub && sub.id+'_'+sub.nom ? sub.id+'_'+sub.nom : '';
      }     
    }
    return "";
  }

  private _filterSub(nom: string): any[] {
    const filterValueSub = nom.toLowerCase();
    return this.optionsSub.filter(option => option.nom.toLowerCase().includes(filterValueSub));
  }

  resetFiltresSub(){
    this.myControlSub.reset();
    this.myControlSub.setValue("");
    this.totalSub = 0;
    this.selectedMesSub = -1;
    this.selectedSubcategoriaId = -1;
    this.regSubParcials = []
  }

  renderTaulaParcialsSub(){
    return this.regSubParcials.length != 0 ? true: false;
  }

  //--------------
  //CATEGORIES
  //--------------
 
  public onChangeCategory(cat : Categoria){
    this.selectedCategoriaId = cat.id;
    this.service.getTotalCatByYear(this.selected, cat.id).subscribe
    (data=> {
      this.totalCat = +data;
    });
    if (this.selectedMesCat != -1){
      this.selectMesCatChange()
    }
  }

  selectMesCatChange(){
    this.tRegCatParcials = 0
    if (this.selectedCategoriaId != -1 ) {
      this.service.getCatByYearMonth(this.selected, this.selectedCategoriaId, this.selectedMesCat+1).subscribe
      (data=> {
        let dades : Registre | any = data;
        this.regCatParcials = dades;
        if (this.regCatParcials.length != 0){
          this.regCatParcials.forEach(reg =>  {
            this.tRegCatParcials += reg.importreg
          });   
        }
      });     
    }
  }

  displayFnCat(cat: Categoria): string {
    if(cat != null){
      if (cat.id == 0) {
        return "";
      }else{
        return cat && cat.id+'_'+cat.nom ? cat.id+'_'+cat.nom : '';
      }
    }
    return "";
  }

  private _filterCat(nom: string): any[] {
    const filterValueCat = nom.toLowerCase();
    return this.optionsCat.filter(option => option.nom.toLowerCase().includes(filterValueCat));
  }

  resetFiltresCat(){
    if (this.myControlCat != null){
      this.myControlCat.reset();
      this.myControlCat.setValue("");
      this.totalCat = 0;
      this.selectedMesCat = -1;
      this.selectedCategoriaId = -1;
      this.regCatParcials = []
    }
  }

  renderTaulaParcialsCat(){
    return this.regCatParcials.length != 0 ? true: false;
  }

}
