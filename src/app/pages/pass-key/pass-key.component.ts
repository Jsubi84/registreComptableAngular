import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs';
import { CookieManagerService } from 'src/app/service/cookies-manager-service.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-pass-key',
  templateUrl: './pass-key.component.html',
  styleUrls: ['./pass-key.component.scss'],
})

export class PassKeyComponent {
  passkeyForm!: FormGroup;

  constructor(private router: Router, private dialog: Dialogs , private userService: UsersService, private cookieService: CookieManagerService) {
    this.passkeyForm = new FormGroup({
      oldpass: new FormControl('', Validators.required),
      newpass1: new FormControl('', Validators.required),
      newpass2: new FormControl('', Validators.required),
    });
  }

  sortir() {
    this.router.navigate(['/dashboard']);
  }

  actualitzar() {
    if (this.passkeyForm.value.newpass1 != this.passkeyForm.value.newpass2) {
      this.dialog.simpleAlert('', "Les contrasenyes no coincideixen", 'error');
      return;
    }
    this.userService.passwordRestore(this.cookieService.getUserName(), this.passkeyForm.value.oldpass, this.passkeyForm.value.newpass1).subscribe({
      next: data => {
        if (data) {
          console.log(data);
          this.dialog.simpleAlert('', "Contrasenya actualitzada correctament", 'success');
          this.router.navigate(['/dashboard']);
        } else {
          this.dialog.simpleAlert('', "Contrasenya incorrecta", 'error');
        }
      },
      error: (e) => {
        console.log(e.message);
        this.dialog.simpleAlert( e.message, "Error al actualitzar la contrasenya", 'error');
      }
  });
  }
}
