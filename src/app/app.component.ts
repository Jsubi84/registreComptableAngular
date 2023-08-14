import { Component , OnInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingService } from './service/loading.service';
import { CategoriaService } from './service/categoria.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Registre Comptable';

  constructor(private router: Router, public loadingService: LoadingService, private service:CategoriaService) {}

  ngOnInit() {
    // Suscribirse al evento de inicio de navegación para controlar el estado de carga
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Si es la carga inicial de la aplicación, mostramos el spinner
        if (this.loadingService.isFirstLoad) {
          this.loadingService.setLoading(true);
          this.loadingService.setIsFirstLoad(false);
        }
      }
    });
  }

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
    return !this.service.isEdit ?  true :  false;
  }
}
