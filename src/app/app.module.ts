import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from  "@angular/forms"
import { CategoriaService} from './service/categoria.service';
import { Dialogs } from './dialogs/dialogs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from "./app.routing";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule, 
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserModule
  ],
  exports: [MatDatepickerModule],
  providers: [CategoriaService, Dialogs, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
