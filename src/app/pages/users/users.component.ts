import { Component } from '@angular/core';
import { User } from 'src/app/modelo/user';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Dialogs } from 'src/app/dialogs/dialogs';
import { CookieManagerService } from 'src/app/service/cookies-manager-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  usuaris!: User[];
  progres: Boolean = false;
  mobil: Boolean = false;

  displayedColumns: string[] = ['id', 'nom', 'rol'];
  dataSource = this.usuaris;

  constructor( private service: UsersService, private router: Router, private dialog: Dialogs, 
    private cookieService: CookieManagerService) {
    this.progres = true;
  }

  ngOnInit(): void {
    this.mobil = window.innerWidth > 600 ? false : true;
    this.service.getAllUsers().subscribe({
      next: data => {
        this.usuaris = data;
        this.usuaris.sort((x, y) => x.id - y.id);
        this.progres = false;
      },
      error: (e) => {
        if (e.status == 401) this.router.navigate(["login"]);
      }
    });
  }

  roles(listRoles: any) {
    let result = '';
    listRoles.forEach((element: any) => {
      result += element.roleEnum + ' ';
    });
    return result;
  }

  Nou() {
    this.router.navigate(['users/edit']);
  }

  Editar(user: User, row = false) {
    if (row && !this.mobil) return;
    this.router.navigate(['users/edit/', user.id]);
  }

  Delete(user: User) {
    Swal.fire({
      title: "Vols borrar l'usuari?",
      text: 'Si borres no es pot recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, borra'l",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.cookieService.getUserName() == user.username ){
          this.dialog.info("No pots borrar el propi usuari", 'warning');
          return;
        } 
        this.service.deleteUser(user).subscribe((data) => {
          this.usuaris = this.usuaris.filter((u) => u !== user);
          this.dialog.info("S'ha borrat l'usuari", 'success');
        });
      }
    });
  }

  passRestore(user: User) {
    this.dialog
      .confirmAction(
        'Reset password',
        "Estas segur que vols resetejar el password d'aquest usuari?",
        'warning',
        'Si',
        'No'
      )
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.resetPassword(user).subscribe({
            next: (data) => {
              if (data) {
                this.dialog.info('Contrasenya resetejada', 'success');
              } else {
                this.dialog.info('No s\'ha pogut resetejar', 'error');
              }
            },
            error: (e) => {
              this.dialog.info(e.error, 'error');
            },
          });
        }
      });
  }
}
