import { Component, HostBinding } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
	template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'Registre Comptable';
  configuracio!: Observable<any>;

  constructor(private router: Router) {
  }
}
