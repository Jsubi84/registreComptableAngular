import { Component,  OnInit} from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { SubcategoriaService } from '../../service/subcategoria.service';
import { RegistreService } from '../../service/registre.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Categoria } from 'src/app/modelo/categoria';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})

export class SubcategoryComponent implements OnInit {
  options!:Categoria[];
  optionsBuit!:Categoria[];
  filteredOptions!: Observable<Categoria[]>;
  myControl = new FormControl<string | Categoria>('');
  subcategories!:Subcategoria[];
  subcategoriesMemory!:Subcategoria[];
  progress!: Boolean;
  progres: Boolean = false;
  mobil: Boolean = false;

  displayedColumns: string[] = ['nom', 'categoria', 'descripcio'];
  dataSource = this.subcategories;

  constructor(private serviceCat:CategoriaService, private registre_service: RegistreService, private service:SubcategoriaService, private router:Router, private dialog:Dialogs){
    this.progres = true;
  }

  ngOnInit(): void {
    this.mobil = window.innerWidth > 600 ? false : true; 
    this.service.getSubcategorias().subscribe
      (data=>{
        this.subcategories = data;
        this.subcategoriesMemory = data;
        this.subcategories.sort((x,y)=> x.id- y.id);
        this.progres = false;
      })
    this.serviceCat.getCategorias().subscribe({
      next: data=>{
        this.options = data;
      }, error: (e)=>{
        if (e.status == 401){
          this.router.navigate(["login"]);
        }
      }
      }); 
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const nom = typeof value === 'string' ? value : value?.nom;
          return nom ? this._filter(nom as string) : this.optionsBuit;
      }),
    );
  }

  Nou(){
    this.router.navigate(["subcategory/edit"]);
    this.service.isEdit = false;
  } 

  Editar(subcategoria:Subcategoria, row = false){
    if (row && !this.mobil) return;
    this.router.navigate(["subcategory/edit/", subcategoria.id]);
    this.service.isEdit = true;
  }

  Delete(subcategoria: Subcategoria){
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
        this.registre_service.ckRegistresToDeleteSubcategoria(subcategoria.id).subscribe
        ((data)=>{ 
          if (data == 0){
            this.service.deleteSubcategoria(subcategoria).subscribe
            (data=>{
              this.subcategories= this.subcategories.filter(s=>s!==subcategoria);
            })  
            this.dialog.registregBorrat("S'ha borrat la subcategoria");    
          }else{
            this.dialog.simpleAlert("La subcategoria no es pot borrar ja que te "+ data +" registres associats","Subcategoria no borrable","info");
          } 
        })
      }
    })    
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  displayFn(cat: Categoria): string {
    if (cat != null){
      if (cat.id == 0) {
        return "";
      }else{
        return cat && cat.id+'_'+cat.nom ? cat.id+'_'+cat.nom : '';
      }
    }
    return "";
  }

  resetFiltres(){
    this.myControl.reset();
    this.myControl.setValue("");
    this.subcategories = this.subcategoriesMemory;
  }

  public onChangeCategory(cat : Categoria){
    let result;
    result = this.subcategoriesMemory.filter(option => option.categoria.id == cat.id);    
    this.subcategories = result;
  }

}
