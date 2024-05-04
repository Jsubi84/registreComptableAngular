import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { RegisterEditComponent } from './register-edit/register-edit.component';
import { RegisterComponent } from './register.component';
import { RegistreService } from '../../service/registre.service';
import { Dialogs } from '../../dialogs/dialogs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatTableModule} from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { JsonPipe }  from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

const routes_extras = [
  { path:'', component:RegisterComponent},
  { path:'edit', component:RegisterEditComponent},
  { path:'edit/:id', component:RegisterEditComponent}
];

@NgModule({
  declarations: [
    RegisterComponent,    
    RegisterEditComponent
  ],
  imports: [
    RouterModule.forChild(routes_extras),
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonToggleModule,
    JsonPipe,
    MatPaginatorModule,
    MatButtonModule
  ],
  exports: [],
  providers: [RegistreService, Dialogs],
})
export class RegisterModule { }
