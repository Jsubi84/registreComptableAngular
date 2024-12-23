import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PassKeyComponent } from './pass-key.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

const routes_extras = [
  { path:'', component:PassKeyComponent},
]

@NgModule({
  declarations: [
    PassKeyComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule.forChild(routes_extras)
  ]
})
export class PassKeyModule { }
