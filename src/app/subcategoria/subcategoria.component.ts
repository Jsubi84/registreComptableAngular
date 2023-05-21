import { Component,  OnInit} from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { SubcategoriaService } from '../service/subcategoria.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {

  subcategories!:Subcategoria[];
  progress!: Boolean;

  displayedColumns: string[] = ['id', 'nom', 'descripcio', 'categoria','accions'];
  dataSource = this.subcategories;

  constructor(private service:SubcategoriaService, private router:Router, private dialog:Dialogs){
    this.progress = true;
  }

  ngOnInit(): void {
    this.service.getSubcategorias().subscribe
      (data=>{
        this.subcategories = data;
    })   
    this.progress = false;
  }

  Nou(){
    this.router.navigate(["subcatedit"]);
    this.service.isEdit = false;
  } 


  Editar(subcategoria:Subcategoria){
    this.router.navigate(["subcatedit/"]);
    if (subcategoria.id != undefined){
      this.service.id = subcategoria.id.toString();
    }
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
            this.service.deleteSubcategoria(subcategoria).subscribe
            (data=>{
              this.subcategories= this.subcategories.filter(s=>s!==subcategoria);
            })  

        this.dialog.registregBorrat();    
      }
    })
  }
}
