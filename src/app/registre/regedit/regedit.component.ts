import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core'
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { RegistreService } from 'src/app/service/registre.service';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  selector: 'app-regedit',
  templateUrl: './regedit.component.html',
  styleUrls: ['./regedit.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps:[ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc:true, strict:true, firstDayOfWeek:0}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class RegeditComponent implements OnInit {
  registreForm!:FormGroup;
  myControl = new FormControl<string | Subcategoria>('');
  options!:Subcategoria[];
  filteredOptions!: Observable<Subcategoria[]>;
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private formBuilder: FormBuilder, private router:Router, private _route:ActivatedRoute, private service:RegistreService,  private serviceSub:SubcategoriaService,private dialog:Dialogs){
    this.isEdit= this.service.isEdit;

      this.registreForm = new FormGroup({
        id: new FormControl(),
        subcategoria : new FormControl('', Validators.required),
        importreg: new FormControl('', Validators.required),
        data: new FormControl(new Date(), Validators.required),
        descripcio: new FormControl(''),
      });
  }

  Guardar(){
    this.service.createRegistre(this.registreForm.value)
    .subscribe(data=>{
        this.dialog.registregGuardat();
        this.router.navigate(["registres"]);
    })
  }

  ngOnInit(): void {
    this.serviceSub.getSubcategorias().subscribe
    (data=>{
      this.options = data;
    })    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filter(nom as string) : this.options;
       }),
    );
    //Mirem si s'ha de recuperar dades o es registre nou
    if (this.isEdit){
      this.recuperar();
    }
  }

  Cancelar(){
    this.router.navigate(["registres"]);
  }

  recuperar(){
    let id = this._route.snapshot.params['id'];
    this.service.getRegistreId(id).subscribe(
      data=>{
        this.registreForm.patchValue({
          id: data.id,
          subcategoria: data.subcategoria,
          importreg: data.importreg,
          data: data.data,
          descripcio: data.descripcio,
        });
      }
    );
  }

  Actualizar(){
    this.service.updateRegistre(this.registreForm.value).subscribe(
    data=>{
      this.dialog.simpleAlert("Registre actualitzat","El registre ha estat actualitzat","info");
      this.router.navigate(["registres"]);
    })
    this.service.isEdit = false;
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  public onChangeSubcategory(sub : Subcategoria){
    this.registreForm.patchValue({
      subcategoria: sub
    });
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

}
