import { Component,  OnInit} from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { SubcategoriaService } from '../service/subcategoria.service';
import { Router } from '@angular/router'
import { Dialogs } from 'src/app/dialogs/dialogs'
import Swal from 'sweetalert2';
import { RegistreService } from '../service/registre.service';
import { ConfigService } from '../service/config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {

  configuracio!: Observable<any>;
  subcategories!:Subcategoria[];
  progress!: Boolean;
  progres: Boolean = false;

  displayedColumns: string[] = ['nom', 'descripcio', 'categoria','accions'];
  dataSource = this.subcategories;

  constructor(private configService: ConfigService, private registre_service: RegistreService, private service:SubcategoriaService, private router:Router, private dialog:Dialogs){
    this.configuracio = configService.getConfig();
    this.progres = true;
  }

  ngOnInit(): void {
    this.configuracio.subscribe(()=>{
      this.service.getSubcategorias().subscribe
        (data=>{
          this.subcategories = data;
          this.subcategories.sort((x,y)=> x.id- y.id);
          this.progres = false;
      })  
    }); 
  }

  Nou(){
    this.router.navigate(["subcatedit"]);
    this.service.isEdit = false;
  } 

  Editar(subcategoria:Subcategoria){
    this.router.navigate(["subcatedit/", subcategoria.id]);
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
            this.dialog.registregBorrat();    
          }else{
            this.dialog.simpleAlert("La subcategoria no es pot borrar ja que te "+ data +" registres associats","Subcategoria no borrable","info");
          } 
        })
      }
    })    
  }
}
