import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieManagerService } from '../service/cookies-manager-service.service';
import { Dialogs } from '../dialogs/dialogs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private timeoutRef: any;
  private waitimeoutRef: any;
  private intervalRef: any;

  constructor(private cookiesServices: CookieManagerService, private router: Router, private dialog: Dialogs) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest = request;

    if (this.cookiesServices.checkSessionToken()) {
      this.cookiesServices.setSessionToken(this.cookiesServices.getSessionToken(), 60);
      clearTimeout(this.timeoutRef);
      clearInterval(this.intervalRef);

      this.startSessionTimeout();

      clonedRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.cookiesServices.getSessionToken()!,
          'Access-Control-Allow-Origin': 'https://registrecomptabledeploy.onrender.com',
        },
      });
    } else {
      this.router.navigate(['login']);
    }
    return next.handle(clonedRequest);
  }

  private startSessionTimeout() {
    let timeLeft = 60; //Temps espera per a tancar la sessió en segons.
    this.timeoutRef = setTimeout(() => {
      this.dialog.timeExpire('Temps sessió',`Vols mantenir la sessió activa?<br>(${timeLeft}s restants)`)
        .then((result) => {
          clearInterval(this.intervalRef);
          if (result.isConfirmed) {this.cookiesServices.setSessionToken( this.cookiesServices.getSessionToken(), 60);
            Swal.close(); // Tanca el diàleg
            this.startSessionTimeout();
          } else if (result.isDenied) {
            this.cookiesServices.deleteSessionToken();
            this.router.navigate(['login']);
          }
        });
      //Compte enrere per a tancar la sessió
      this.intervalRef = setInterval(() => {
        timeLeft--;
        Swal.update({title: 'Temps sessió', html: `Vols mantenir la sessió activa?<br>(${timeLeft}s restants)`});
        if (timeLeft <= 0) {
          clearInterval(this.intervalRef);
          this.cookiesServices.deleteSessionToken();
          this.router.navigate(['login']);
          Swal.close(); // Tanca el diàleg
        }
      }, 1000);   // 1 segon en mil·lisegons
    }, 3000000);  // 50 minuts en mil·lisegons
  }

}
