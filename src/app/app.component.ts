import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from './service/categoria.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Registre Comptable';
  showFiller = false;

  constructor (private router:Router, private service:CategoriaService){}

  dashboard(){
    this.router.navigate(["dashboard"]);
  }
  
  categoria(){
    this.router.navigate(["listCat"]);
    this.service.isEdit = false;
  }

  subcategoria(){
    this.router.navigate(["subcategories"]);
  }

  registre(){
    this.router.navigate(["registres"]);
  }

  checkIsEdit() {
    if (!this.service.isEdit ){
      return true;
    } else{
      return false;
    }
  }
  
}
