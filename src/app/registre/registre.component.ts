import { Component, OnInit } from '@angular/core';
import { RegistreService } from '../service/registre.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';
import { Registre } from '../modelo/registre';
import { FormControl, FormGroup} from '@angular/forms';
import { Subcategoria } from '../modelo/subcategoria';
import { ConfigService } from '../service/config.service';
import { SubcategoriaService } from '../service/subcategoria.service';
import { Observable, map, startWith } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'

export const DATE_PICKER_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateAllyLable: 'DD/MM/YYYY',
    monthYearAllyLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps:[ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc:true, strict:true, firstDayOfWeek:0}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class RegistreComponent implements OnInit{

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  configuracio!: Observable<any>;
  dataRange: any;
  subcategoria: any;
  options!:Subcategoria[];
  optionsBuit!:Subcategoria[];
  filteredOptions!: Observable<Subcategoria[]>;
  myControl = new FormControl<string | Subcategoria>('');
  registres!:Registre[];
  registresMemory!:Registre[];
  progress!: Boolean;
  progres: Boolean = false;
  filterDateRange : Boolean = false; 
  filterSubcat : Boolean = false; 

  displayedColumns: string[] = ['data', 'import', 'subcategoria','accions'];

  constructor( private configService: ConfigService, private serviceSub:SubcategoriaService, private service:RegistreService, private router:Router, private dialog:Dialogs){
    this.configuracio = configService.getConfig();
    this.progres = true;
  }

   ngOnInit(): void {
    this.configuracio.subscribe(()=>{
      this.service.findAllWithSort().subscribe
        (data=>{
          this.registres = data;
          this.registresMemory = data;
          this.progres = false;
      })   
      this.serviceSub.getSubcategorias().subscribe
      (data=>{
        this.options = data;
      })  
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const nom = typeof value === 'string' ? value : value?.nom;
          return nom ? this._filter(nom as string) : this.optionsBuit;//this.options;
          }),
      );
    });
   }

  Nou(){
    this.router.navigate(["regedit"]);
    this.service.isEdit = false;
  } 

  Editar(registre:Registre){
    this.router.navigate(["regedit/", registre.id]);
    this.service.isEdit = true;
  }

  Delete(registre: Registre){
    Swal.fire({
      title: 'Vols borrar el registre?',
      text: "Si borres no es pot recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borra\'l'
    }).then((result) => {
      if (result.isConfirmed) {
            this.service.deleteRegistre(registre).subscribe
            (data=>{
              this.registres= this.registres.filter(s=>s!==registre);
            })  
        this.dialog.registregBorrat();    
      }
    })
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  displayFn(sub: Subcategoria): string {
    if (sub != null){
      if (sub.id == 0) {
        return "";
      }else{
        return sub && sub.id+'_'+sub.nom ? sub.id+'_'+sub.nom : '';
      }      
    }
    return "";
  }

  resetFiltres(){
    this.registres = this.registresMemory;
    this.myControl.reset();
    this.range.reset();
    this.filterDateRange = false;
    this.filterSubcat = false;
  }

  public onChangeSubcategory(sub : Subcategoria){
    let result;
    this.subcategoria = sub
    if (!this.filterDateRange){
      result = this.registresMemory.filter(option => option.subcategoria.id == sub.id);    
    }else if (this.filterDateRange && this.filterSubcat){
      this.registres = this.registresMemory.filter(option => option.subcategoria.id == sub.id); 
      result = this.registres.filter(option => new Date(option.data).valueOf() >=  this.dataRange.start._d.valueOf() && new Date(option.data).valueOf() <= this.dataRange.end._d.valueOf());
    }else{
      result = this.registres.filter(option => option.subcategoria.id == sub.id);    
    }
    this.registres = result;
    this.filterSubcat = true;
  }

  dateRangeChange(range: any){
    let result;
    this.dataRange = range
    if (range.end != null) {
      if (!this.filterSubcat){     
        result = this.registresMemory.filter(option => new Date(option.data).valueOf() >=  range.start._d.valueOf() && new Date(option.data).valueOf() <= range.end._d.valueOf());
      }else if (this.filterDateRange && this.filterSubcat){
        this.registres =  this.registresMemory.filter(option => new Date(option.data).valueOf() >=  this.dataRange.start._d.valueOf() && new Date(option.data).valueOf() <= this.dataRange.end._d.valueOf());
        result = this.registres.filter(option => option.subcategoria.id == this.subcategoria.id);
      }else{
        result = this.registres.filter(option => new Date(option.data).valueOf() >=  range.start._d.valueOf() && new Date(option.data).valueOf() <= range.end._d.valueOf());
      } 
      this.registres = result;
      this.filterDateRange = true;
    }
  }
}

