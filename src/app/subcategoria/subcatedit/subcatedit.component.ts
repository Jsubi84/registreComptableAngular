import { Component, OnInit } from '@angular/core';
import { Subcategoria } from 'src/app/modelo/subcategoria';
import { Categoria } from 'src/app/modelo/categoria';
import { Router , ActivatedRoute} from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs'
import { SubcategoriaService } from 'src/app/service/subcategoria.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-subcatedit',
  templateUrl: './subcatedit.component.html',
  styleUrls: ['./subcatedit.component.scss']
})
export class SubcateditComponent implements OnInit {

  myControl = new FormControl<string | Categoria>('');
  options!:Categoria[];
  filteredOptions!: Observable<Categoria[]>;
  modelSubcategoria= new Subcategoria();
  isEdit: Boolean = false;
  value = 'Clear';

  constructor(private router:Router, private _route:ActivatedRoute, private service:SubcategoriaService,  private serviceCat:CategoriaService,private dialog:Dialogs){
    this.isEdit= this.service.isEdit;
  }

  Guardar(subcategoria: Subcategoria){
    this.service.createSubcategoria(subcategoria)
    .subscribe(data=>{
        this.dialog.registregGuardat();
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
        this.modelSubcategoria=data;
      }
    );     
  }

  Actualizar(subcategoria:Subcategoria){
    this.service.updateSubcategoria(subcategoria).subscribe(
    data=>{
      this.dialog.simpleAlert("Registre actualitzat","info");
      this.router.navigate(["subcategories"]);
    })
    this.service.isEdit = false;
  }

  private _filter(nom: string): any[] {
    const filterValue = nom.toLowerCase();
    return this.options.filter(option => option.nom.toLowerCase().includes(filterValue));
  }

  public onChangeCategory(cat : Categoria){
    this.modelSubcategoria.categoria = cat;
  }

  displayFn(cat: Categoria): string {
    if (cat.id == 0) {
      return "";
    }else{
      return cat && cat.id+'_'+cat.nom ? cat.id+'_'+cat.nom : '';
    }
  }
}
