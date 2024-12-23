import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs';
import { CookieManagerService } from 'src/app/service/cookies-manager-service.service';
import { PublicService } from 'src/app/service/public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  publicService = inject(PublicService);
  router = inject(Router);
  dialog = inject(Dialogs);
  cookieService = inject(CookieManagerService);

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.cookieService.deleteSessionToken();
    this.publicService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.cookieService.setSessionToken(data.jwt, 10);
        this.cookieService.setUserName(data.username);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        if (error.status == 401) {
          this.dialog.simpleAlert(
            "No s'ha pogut logar, credencials invàlides.",
            'AUTENTICACIÓ',
            error
          );
          return;
        }
        this.router.navigate(['login']);
      },
    });
  }
}
