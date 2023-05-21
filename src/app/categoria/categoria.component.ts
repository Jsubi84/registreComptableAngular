import { Component,  OnInit} from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})

export class CategoriaComponent implements OnInit {

  categories!:Categoria[];
  progress!:Boolean;

  displayedColumns: string[] = ['id', 'nom', 'descripcio','accions'];
  dataSource = this.categories;

  constructor(private service:CategoriaService, private router:Router, private dialog:Dialogs){
    this.progress = true;
  }

  ngOnInit(): void {
    this.service.getCategorias().subscribe
      (data=>{
        this.categories = data;
    })   
    this.progress = false;
  }

  Nou(){
    this.router.navigate(["editCat"]);
    this.service.isEdit = false;
  } 


  Editar(categoria:Categoria){
    this.router.navigate(["editCat/"]);
    if (categoria.id != undefined){
      this.service.id = categoria.id.toString();
    }
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
            this.service.deleteCategoria(categoria).subscribe
            (data=>{
              this.categories= this.categories.filter(c=>c!==categoria);
            })  

        this.dialog.registregBorrat();    
      }
    })
  }
}