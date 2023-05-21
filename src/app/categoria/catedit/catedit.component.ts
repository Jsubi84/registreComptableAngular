import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'


@Component({
  selector: 'app-catedit',
  templateUrl: './catedit.component.html',
  styleUrls: ['./catedit.component.scss']
})

export class CateditComponent implements OnInit {

  modelCategoria = new Categoria;
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private router:Router, private service:CategoriaService, private dialog:Dialogs){
    this.isEdit= this.service.isEdit;
  }


  Guardar(categoria: Categoria){
    this.service.createCategoria(categoria)
    .subscribe(data=>{
        this.dialog.registregGuardat();
        this.router.navigate(["listCat"]);
    })
  }

  ngOnInit(): void {
    this.recuperar();
  }

  Cancelar(){
    this.router.navigate(["listCat"]);
  }

  recuperar(){
  if (this.isEdit){
    let id = Number(this.service.id);
    this.service.getCategoriaId(id).subscribe(
      data=>{
        this.modelCategoria=data;
      }
      );
    }
  }

  Actualizar(categoria:Categoria){

    this.service.updateCategoria(categoria).subscribe(
    data=>{
      this.modelCategoria = data;
      this.dialog.simpleAlert("Registre actualitzat","info");
      this.router.navigate(["listCat"]);
    })
    this.service.isEdit = false;
  }
}
