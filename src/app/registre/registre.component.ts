import { Component, OnInit } from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { RegistreService } from '../service/registre.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';
import { Registre } from '../modelo/registre';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit{

  registres!:Registre[];
  progress!: Boolean;

  displayedColumns: string[] = ['id', 'data', 'import', 'tipus', 'subcategoria','accions'];
  dataSource = this.registres;

  constructor(private service:RegistreService, private router:Router, private dialog:Dialogs){
    this.progress = true;
  }

  ngOnInit(): void {
    this.service.getRegistre().subscribe
      (data=>{
        this.registres = data;
    })   
    this.progress = false;
  }

  Nou(){
    this.router.navigate(["regedit"]);
    this.service.isEdit = false;
  } 


  Editar(registre:Registre){
    this.router.navigate(["regedit/"]);
    if (registre.id != undefined){
      this.service.id = registre.id.toString();
    }
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

  public tipusChange(tipus:Boolean): String{
    if (tipus){
      return "Ingres";
    }else{
      return "Despesa";
    }
  }
}

