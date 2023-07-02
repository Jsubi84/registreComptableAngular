import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CateditComponent } from './catedit/catedit.component';
import { CategoriaService} from '../service/categoria.service';
import { Dialogs } from '../dialogs/dialogs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { CateditModule } from './catedit/catedit.module';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CateditComponent,
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
    CateditModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [CategoriaService, Dialogs],
})
export class CategoriaModule { }
