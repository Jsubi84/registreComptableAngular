import { Component , OnInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingService } from './service/loading.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Registre Comptable';
  configuracio!: Observable<any>;

  constructor(private router: Router, public loadingService: LoadingService) {
  }

  ngOnInit() {
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
  }

  subcategoria(){
    this.router.navigate(["subcategories"]);
  }

  registre(){
    this.router.navigate(["registres"]);
  }
}
