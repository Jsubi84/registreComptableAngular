import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegeditComponent } from './regedit/regedit.component';
import { RegistreService } from '../service/registre.service';
import { Dialogs } from '../dialogs/dialogs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { RegeditModule } from './regedit/regedit.module';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    RegeditComponent
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
    MatTableModule,
    RegeditModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSortModule
  ],
  exports: [],
  providers: [RegistreService, Dialogs],
})
export class RegistreModule { }
