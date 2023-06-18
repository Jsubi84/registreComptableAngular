import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class Dialogs{

constructor(){}

public simpleAlert = (missatge : string, titol : string, tipus : SweetAlertIcon) =>
  Swal.fire(
    titol,
    missatge,
    tipus,
  )
  
  public registregGuardat = () =>
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'El registre s\'ha guardat correctament',
    showConfirmButton: false,
    timer: 1000
  })

  public registregBorrat = () =>
  Swal.fire({
    position: 'center',
    icon: 'info',
    title: 'El registre s\'ha borrat correctament',
    showConfirmButton: false,
    timer: 1000
  })

public delete = () =>
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

