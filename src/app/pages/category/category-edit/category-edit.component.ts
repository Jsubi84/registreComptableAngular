import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit{

  categoriaForm!:FormGroup;
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private formBuilder: FormBuilder, private router:Router, private _route:ActivatedRoute, private service:CategoriaService, private dialog:Dialogs){
    this.isEdit= this.service.isEdit;

    this.categoriaForm = new FormGroup({
      tipus: new FormControl('false', Validators.required),
      nom: new FormControl('', Validators.required),
      descripcio : new FormControl(),
    });
  }


  Guardar(){
    this.service.createCategoria(this.categoriaForm.value)
    .subscribe(data=>{
        this.dialog.info('La categoria s\'ha guardat correctament','success');
        this.router.navigate(["category"]);
    })
  }

  ngOnInit(): void {
    if (this.isEdit){
      this.recuperar();
    }
  }

  Cancelar(){
    this.router.navigate(["category"]);
  }

  recuperar(){
    let id = this._route.snapshot.params['id'];
    this.service.getCategoriaId(id).subscribe(
      data=>{
        this.categoriaForm = this.formBuilder.group({
          id: data.id,
          tipus: data.tipus,
          nom: data.nom,
          descripcio: data.descripcio
      });

      const tipusControl = this.categoriaForm?.get('tipus');
      if (tipusControl) {
        tipusControl.setValue(""+ this.categoriaForm.value.tipus+"");
      }
    });
  }

  Actualizar(){
    this.service.updateCategoria(this.categoriaForm.value).subscribe(
    data=>{
      this.dialog.simpleAlert("La categoria ha estat actualitzada","Categoria actualitzada","info");
      this.router.navigate(["category"]);
    })
    this.service.isEdit = false;
  }

}
