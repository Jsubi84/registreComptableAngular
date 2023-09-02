import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SubcategoriaComponent } from './subcategoria/subcategoria.component'
import { RegistreComponent } from './registre/registre.component'
import { CateditComponent } from './categoria/catedit/catedit.component'
import { RegeditComponent } from './registre/regedit/regedit.component'
import { SubcateditComponent } from './subcategoria/subcatedit/subcatedit.component'

const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'dashboard', component:DashboardComponent,  pathMatch: "full"},
  {path:'listCat', component:CategoriaComponent,  pathMatch: "full"},
  {path:'editCat', component:CateditComponent},
  {path:'subcategories', component:SubcategoriaComponent, pathMatch: "full"},
  {path:'registres', component:RegistreComponent,  pathMatch: "full"},
  {path:'subcatedit', component:SubcateditComponent}, 
  {path:'regedit', component:RegeditComponent},
  {path:'regedit/:id', component:RegeditComponent},
  {path:'editCat/:id', component:CateditComponent},
  {path:'subcatedit/:id', component:SubcateditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
