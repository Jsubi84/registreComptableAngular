import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

import { Dialogs } from '../../dialogs/dialogs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from 'src/app/service/users.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatChipsModule } from '@angular/material/chips';

const routes = [
  { path:'', component:UsersComponent},
  { path:'edit', component:UserEditComponent},
  { path:'edit/:id', component:UserEditComponent}
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatChipsModule
  ],
  exports: [RouterModule],
  providers: [UsersService, Dialogs],
  declarations: [
    UserEditComponent
  ],
})
export class UsersModule { }
