import { Component } from '@angular/core';
import { User } from 'src/app/modelo/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  usuaris!:User[];
  progres: Boolean = false;
  mobil: Boolean = false;
  
  displayedColumns: string[] = ['id','nom', 'rol'];
  dataSource = this.usuaris;

  constructor( private service:UsersService){
    this.progres = true;
  }

  ngOnInit(): void {
    window.innerWidth > 600 ? this.mobil = false : this.mobil = true; 
    this.service.getAllUsers().subscribe
    (data=>{
      console.log(data)
      this.usuaris = data;
      this.usuaris.sort((x,y)=> x.id- y.id);
      this.progres = false;
    }) 
  }

  roles(listRoles: any){
    let result = "";
    listRoles.forEach((element: any) => {
        result += element.roleEnum + " ";
    });
    return result;
  }

  Nou(){}

}
