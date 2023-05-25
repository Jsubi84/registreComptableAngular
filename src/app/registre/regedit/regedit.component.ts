import { Component, OnInit } from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { Registre } from 'src/app/modelo/registre';
import { Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { RegistreService } from 'src/app/service/registre.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-regedit',
  templateUrl: './regedit.component.html',
  styleUrls: ['./regedit.component.scss']
})
export class RegeditComponent implements OnInit {
  myControl = new FormControl<string | Subcategoria>('');
  options!:Subcategoria[];
  filteredOptions!: Observable<Subcategoria[]>;
  modelRegistre = new Registre();
  isEdit: Boolean = false;
  value = 'Clear';
  changeDataPicker: Boolean = false;

  constructor(private router:Router, private service:RegistreService,  private serviceSub:SubcategoriaService,private dialog:Dialogs){
    this.isEdit= this.service.isEdit;
  }

  Guardar(registre: Registre){
    registre = this.convertDate(registre);
    this.service.createRegistre(registre)
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
    let id = Number(this.service.id);
    this.service.getRegistreId(id).subscribe(
      data=>{
        this.modelRegistre = data;
      }
    );     
  }

  convertDate(registre:Registre):Registre{
      if (this.changeDataPicker){
      let day = registre.data.getDate()
      let month = registre.data.getMonth()
      let year = registre.data.getFullYear()
      registre.data = new Date(year, month, day +1);
      this.changeDataPicker = false;
    }
    return registre;
  }

  Actualizar(registre:Registre){
    registre = this.convertDate(registre);
    this.service.updateRegistre(registre).subscribe(
    data=>{
      this.dialog.simpleAlert("Registre actualitzat","info");
      this.router.navigate(["registres"]);
    })
    this.service.isEdit = false;
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  public onChangeSubcategory(sub : Subcategoria){
    this.modelRegistre.subcategoria = sub;
  }

  modelChanged(){
    this.changeDataPicker = true;
  }

  displayFn(sub: Subcategoria): string {
    if (sub.id == 0) {
      return "";
    }else{
      return sub && sub.id+'_'+sub.nom ? sub.id+'_'+sub.nom : '';
    }
  }
}
