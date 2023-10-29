import { Component,  OnInit} from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from '../service/categoria.service';
import { SubcategoriaService } from '../service/subcategoria.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})

export class CategoriaComponent implements OnInit {

  categories!:Categoria[];
  progres: Boolean = false;

  displayedColumns: string[] = [ 'nom', 'descripcio','tipus', 'accions'];
  dataSource = this.categories;

  constructor( private service:CategoriaService, private subCat_service: SubcategoriaService, private router:Router, private dialog:Dialogs){
    this.progres = true;
  }

  ngOnInit(): void {
    this.service.getCategorias().subscribe
    (data=>{
      this.categories = data;
      this.categories.sort((x,y)=> x.id- y.id);
      this.progres = false;
    }) 
  }

  Nou(){
    this.router.navigate(["editCat"]);
    this.service.isEdit = false;
  } 

  Editar(categoria:Categoria){
    this.router.navigate(["editCat/", categoria.id]);
    this.service.isEdit = true;
  }

  Delete(categoria: Categoria){
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
        this.subCat_service.ckSubCatToDeleteCategoria(categoria.id).subscribe
        ((data)=>{ 
          if (data == 0){
              this.service.deleteCategoria(categoria).subscribe
              (data=>{
                this.categories= this.categories.filter(c=>c!==categoria);
              })  
            this.dialog.registregBorrat();  
          }else{
            this.dialog.simpleAlert("La categoria no es pot borrar ja que te "+ data +" subcategorias associades","Categoria no borrable","info");
          } 
        })
      }
    })
  }

  public tipusChange(tipus:Boolean): String{
    if (tipus){
      return "Ingres";
    }else{
      return "Despesa";
    }
  }
}