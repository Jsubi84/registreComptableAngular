import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class Dialogs{

constructor(private router:Router){}

public simpleAlert = (missatge : string, titol : string, tipus : SweetAlertIcon) =>
  Swal.fire(
    titol,
    missatge,
    tipus,
  )

  public info = (titol : string, tipus : SweetAlertIcon) =>
  Swal.fire({
    position: 'center',
    icon: tipus,
    title: titol,
    showConfirmButton: false,
    timer: 1500
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

