import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { RoleRequest, User } from 'src/app/modelo/user';
import { UsersService } from 'src/app/service/users.service';
import { Dialogs } from 'src/app/dialogs/dialogs'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{

  isEdit: Boolean = false;
  userForm!:FormGroup;
  userUpdate!: User;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private service:UsersService, 
    private dialog:Dialogs){
    this.userForm = new FormGroup({
      nom:  new FormControl('', Validators.required),
      rols:  new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.isEdit = id ? true: false;
    if (this.isEdit) this.recuperar(id);
  }

  recuperar(id: number){
    this.service.getUserId(id).subscribe(
      data=>{
        let roles: String[] = [];
        data.roles.forEach(rol =>roles.push(rol.roleEnum));
        this.userForm.patchValue({
          nom:  data.username,
          rols: roles
        });
        this.userUpdate = data;
      }
    );
  }

  Cancelar(){
    this.router.navigate(["users"]);
  }

  Guardar(){
    let user = new User
    let roleListName = new RoleRequest
    roleListName.roleListName = this.userForm.value.rols
    user.password = "1234"
    user.username = this.userForm.value.nom
    user.roleRequest = roleListName
    this.service.newUser(user).subscribe
    (data=>{
      if (data){
        console.log(data);
        if(data.success){
          this.dialog.info("L\'usuari ha estat creat","success");
          this.router.navigate(["users"])  
        } else {
          this.dialog.info("L\'usuari ja existeix","error");
        }
      } else{
        this.dialog.info("Alguna cosa no ha anat bé.","error");
      }
    });
  }

  Actualizar(){
    let roleList = new RoleRequest    
    roleList.roleListName = this.userForm.value.rols
    this.userUpdate.roleRequest = roleList;
    this.userUpdate.username = this.userForm.value.nom
    this.service.updateUser(this.userUpdate).subscribe
    (data=>{
      if (data){
        this.dialog.info("L\'usuari ha estat actualitzat","success");
        this.router.navigate(["users"])       
      } else{
        this.dialog.info("Alguna cosa no ha anat bé.","error");
      }
    });
  }
}
