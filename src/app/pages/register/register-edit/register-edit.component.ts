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
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps:[ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc:true, strict:true, firstDayOfWeek:0}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class RegisterEditComponent implements OnInit{

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
        data: new FormControl(moment(), Validators.required),
        descripcio: new FormControl(''),
      });
  }

  Guardar(){

    let dataRegistre: string 
    let reg = this.registreForm.get('importreg')?.value;
    let datareg = this.registreForm.get('data')?.value;
    let subcat = this.registreForm.get('subcategoria')?.value;

    //Comprovar que no és un registre repetit
    this.service.getRegistreRepeate(reg, datareg.format('YYYY-MM-DD'), subcat).subscribe(data=>{
      if (data == 0){
        this.service.createRegistre(this.registreForm.value)
        .subscribe(data=>{
          this.dialog.info('El registre s\'ha guardat correctament','success');
          this.router.navigate(["register"]);
        })
      }else{
        Swal.fire({
          title: "Registre repetit",
          text: "El registre que has introduit pot estar repetit. Vol guardar igualment?",
          showDenyButton: true,
          confirmButtonText: 'Guardar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.createRegistre(this.registreForm.value)
            .subscribe(data=>{
              this.dialog.info('El registre s\'ha guardat correctament','success');
              this.router.navigate(["register"]);
            })
          } else if (result.isDenied) {
            this.dialog.info( 'El registre ha estat descartat','info');
            this.router.navigate(["register"]);
          }
        })
      }
    });
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
    this.router.navigate(["register"]);
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

  Actualitzar(){
    this.service.updateRegistre(this.registreForm.value).subscribe(
    data=>{
      this.dialog.simpleAlert('El registre ha estat actualitzat', 'Registre actualitzat','info');
      this.router.navigate(["register"]);
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
