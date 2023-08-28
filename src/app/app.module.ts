import { NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from  "@angular/forms"
import { CategoriaService} from './service/categoria.service';
import { Dialogs } from './dialogs/dialogs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategoriaModule} from './categoria/categoria.module';
import { CateditModule } from './categoria/catedit/catedit.module';
import { RegeditModule } from './registre/regedit/regedit.module';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { RegistreComponent } from './registre/registre.component';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { RegistreModule } from './registre/registre.module';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatSelectModule } from '@angular/material/select'
import { ConfigService } from './service/config.service';
import { LoaderComponent } from './loader/loader.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    DashboardComponent,
    SubcategoriaComponent,
    RegistreComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule, 
    CategoriaModule,
    CateditModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    DashboardModule,
    MatButtonModule,
    MatTooltipModule,
    SubcategoriaModule, 
    RegistreModule,
    MatDatepickerModule,
    RegeditModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [MatDatepickerModule],
  providers: [ConfigService, CategoriaService, Dialogs],
  bootstrap: [AppComponent]
})
export class AppModule { }
