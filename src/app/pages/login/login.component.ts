import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialogs } from 'src/app/dialogs/dialogs';
import { PublicService } from 'src/app/service/public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{

loginForm!:FormGroup;
publicService = inject(PublicService);
router= inject(Router);
dialog= inject(Dialogs);

  constructor(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(){
    this.publicService.login(this.loginForm.value).subscribe
    (data=>{
      localStorage.removeItem('session_token');
      localStorage.setItem('session_token', data.jwt);
      this.router.navigate(["dashboard"]);
    }, error=>{
      console.log(error);
      if (error.status == 401){
        this.dialog.simpleAlert("No s'ha pogut logar, credencials invalides.", "AUTENTICACIÓ", "error");
        return;
      }
      localStorage.removeItem('session_token');
      this.router.navigate(["login"]);      
    }); 
  }

}
