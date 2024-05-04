import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryEditComponent } from './subcategory-edit/subcategory-edit.component';
import { RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcategoryComponent } from './subcategory.component';
import { MatButtonModule } from '@angular/material/button';

const routes = [
  { path:'', component:SubcategoryComponent},
  { path:'edit', component:SubcategoryEditComponent},
  { path:'edit/:id', component:SubcategoryEditComponent}
];

@NgModule({
  declarations: [
    SubcategoryEditComponent,
    SubcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class SubcategoryModule { }
