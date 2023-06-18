import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';


@Component({
  selector: 'app-catedit',
  templateUrl: './catedit.component.html',
  styleUrls: ['./catedit.component.scss']
})

export class CateditComponent implements OnInit {

  categoriaForm!:FormGroup;
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private formBuilder: FormBuilder, private router:Router, private _route:ActivatedRoute, private service:CategoriaService, private dialog:Dialogs){
    this.isEdit= this.service.isEdit;

    this.categoriaForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      descripcio : new FormControl(),
    });
  }


  Guardar(){
    this.service.createCategoria(this.categoriaForm.value)
    .subscribe(data=>{
        this.dialog.registregGuardat();
        this.router.navigate(["listCat"]);
    })
  }

  ngOnInit(): void {
    if (this.isEdit){
      this.recuperar();
    }
  }

  Cancelar(){
    this.router.navigate(["listCat"]);
  }

  recuperar(){
    let id = this._route.snapshot.params['id'];
    this.service.getCategoriaId(id).subscribe(
      data=>{
        this.categoriaForm = this.formBuilder.group({
          id: data.id,
          nom: data.nom,
          descripcio: data.descripcio
      });
    });
  }

  Actualizar(){

    this.service.updateCategoria(this.categoriaForm.value).subscribe(
    data=>{
      this.dialog.simpleAlert("Registre actualitzat","El registre ha estat actualitzat","info");
      this.router.navigate(["listCat"]);
    })
    this.service.isEdit = false;
  }
}
