import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcateditComponent } from './subcatedit/subcatedit.component';
import { SubcategoriaService} from '../service/subcategoria.service';
import { Dialogs } from '../dialogs/dialogs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { SubcateditModule } from './subcatedit/subcatedit.module';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubcateditComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    SubcateditModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [SubcategoriaService, Dialogs],
})
export class SubcategoriaModule { }
