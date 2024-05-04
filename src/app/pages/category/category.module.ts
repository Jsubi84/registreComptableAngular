import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes} from '@angular/router';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoriaService} from '../../service/categoria.service';
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

const routes_extras = [
  { path:'', component:CategoryComponent},
  { path:'edit', component:CategoryEditComponent},
  { path:'edit/:id', component:CategoryEditComponent}
];

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes_extras),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  providers: [CategoriaService, Dialogs],
})
export class CategoryModule { }
