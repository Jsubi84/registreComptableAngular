import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelo/categoria';
import { Router , ActivatedRoute} from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-subcatedit',
  templateUrl: './subcatedit.component.html',
  styleUrls: ['./subcatedit.component.scss']
})
export class SubcateditComponent implements OnInit {

  subcategoriaForm!:FormGroup;
  myControl = new FormControl<string | Categoria>('');
  options!:Categoria[];
  filteredOptions!: Observable<Categoria[]>;
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private router:Router, private _route:ActivatedRoute, private service:SubcategoriaService,  private serviceCat:CategoriaService,private dialog:Dialogs){
    this.isEdit= this.service.isEdit;

    this.subcategoriaForm = new FormGroup({
      id: new FormControl(),
      categoria : new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      descripcio : new FormControl(),
    });
  }

  Guardar(){
    this.service.createSubcategoria(this.subcategoriaForm.value)
    .subscribe(data=>{
        this.dialog.info('La subcategoria s\'ha guardat correctament','success');
        this.router.navigate(["subcategories"]);
    })
  }

  ngOnInit(): void {
    this.serviceCat.getCategorias().subscribe
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
    this.router.navigate(["subcategories"]);
  }

  recuperar(){
    let id = this._route.snapshot.params['id'];
    this.service.getSubcategoriaId(id).subscribe(
      data=>{ 
        this.subcategoriaForm.patchValue({
            id: data.id,
            categoria: data.categoria,
            nom: data.nom,
            descripcio: data.descripcio,
        });
      }
    );     
  }

  Actualizar(){
    this.service.updateSubcategoria(this.subcategoriaForm.value).subscribe(
    data=>{
      this.dialog.simpleAlert("La subcategoria ha estat actualitzada","Subategoria actualitzada","info");
      this.router.navigate(["subcategories"]);
    })
    this.service.isEdit = false;
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  public onChangeCategory(cat : Categoria){
    this.subcategoriaForm.patchValue({
      categoria: cat
    });
  }

  displayFn(cat: Categoria): string {
    if (cat.id == 0) {
      return "";
    }else{
      return cat && cat.id+'_'+cat.nom ? cat.id+'_'+cat.nom : '';
    }
  }
}
