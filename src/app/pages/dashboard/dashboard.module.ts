import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from  "@angular/forms"
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';

const routes_extras = [
  { path:'', component:DashboardComponent},
]


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(routes_extras)
  ],
})
export class DashboardModule { }
