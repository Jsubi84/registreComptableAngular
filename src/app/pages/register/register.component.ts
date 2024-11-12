import { Component,ViewChild, OnInit } from '@angular/core';
import { RegistreService } from '../../service/registre.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';
import { Registre } from '../../modelo/registre';
import { FormControl, FormGroup} from '@angular/forms';
import { Subcategoria } from '../../modelo/subcategoria';
import { SubcategoriaService } from '../../service/subcategoria.service';
import { Observable, map, startWith } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegistreFilter } from '../../modelo/registreFilter';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps:[ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc:true, strict:true, firstDayOfWeek:0}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})

export class RegisterComponent implements OnInit{


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  pageableData: any; 
  options!:Subcategoria[];
  optionsBuit!:Subcategoria[];
  filteredOptions!: Observable<Subcategoria[]>;
  myControl = new FormControl<string | Subcategoria>('');
  registres!:Registre[];
  registresMemory!:Registre[];
  progres: Boolean = false;
  regPaginator:any;
  totalItems = 0; 
  itemsPerPage:number = 10 ;
  currentPageIndex:number = 0; 
  filter: RegistreFilter; 
  mobil: Boolean = false;

  displayedColumns: string[] = ['data', 'import', 'subcategoria'];

  actions:boolean = false;

  constructor( private serviceSub:SubcategoriaService, private service:RegistreService, private router:Router, private dialog:Dialogs){
    this.progres = true;
    this.filter = {
      dInici :"",
      dFi : "", 
      subcatId :0,
      page: 0,
      size:10 
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.filter.page = event.pageIndex; 
      this.filter.size = event.pageSize; 
      this.loadData(this.filter);
    });
  }

  loadData(filter: RegistreFilter) {
    this.progres = true;
    this.service.findAllFilter(this.filter).subscribe
    (data=>{
      this.pageableData = data;
      this.totalItems= this.pageableData.totalElements;
      this.registres = this.pageableData.content;
      this.progres = false;
    })
  }

  ngOnInit(): void {
    this.mobil = window.innerWidth > 600 ? false : true; 
    if (this.mobil == false ) this.displayedColumns.push('desc');    
    this.paginator._intl.itemsPerPageLabel = "Registres per pàgina"
    this.paginator._intl.firstPageLabel = "Primera pàgina"
    this.paginator._intl.nextPageLabel = "Següent pàgina"
    this.paginator._intl.previousPageLabel = "Anterior pàgina"
    this.paginator._intl.lastPageLabel = "Última pàgina"
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
    this.loadData(this.filter);
    this.regPaginator = new MatTableDataSource<Registre>(this.registres);
    this.regPaginator.paginator = this.paginator; 
    this.serviceSub.getSubcategorias().subscribe
    (data=>{
      this.options = data;}, 
    error=>{
      localStorage.removeItem('session_token');
      this.router.navigate(["login"]);      
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filter(nom as string) : this.optionsBuit;//this.options;
      }),
    );
  }

  Nou(){
    this.router.navigate(["register/edit"]);
    this.service.isEdit = false;
  } 

  Editar(registre:Registre, row = false){
    if (row && !this.mobil) return;
    this.router.navigate(["register/edit/", registre.id]);
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
        this.dialog.registregBorrat("S'ha borrat el registre");    
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
    this.myControl.reset();
    this.range.reset();

    this.filter = {
      dInici :"",
      dFi : "", 
      subcatId :0,
      page: 0,
      size:10  
    }
    this.loadData(this.filter);
    this.paginator.firstPage();
  }

  public onChangeSubcategory(sub : Subcategoria){
    this.filter.subcatId = sub.id;
    this.loadData(this.filter);
    this.paginator.firstPage();
  }

  dateRangeChange(range: any){
    if (range.end != null) {
      this.filter.dInici = range.start._i.year + "-" + (range.start._i.month+1) + "-" + range.start._i.date;
      this.filter.dFi = range.end._i.year + "-" + (range.end._i.month+1) + "-" + range.end._i.date;
    }
    this.loadData(this.filter);
    this.paginator.firstPage();
  }

}
