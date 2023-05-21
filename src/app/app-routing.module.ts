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
  {path:'dashboard', component:DashboardComponent},
  {path:'listCat', component:CategoriaComponent},
  {path:'editCat', component:CateditComponent},
  {path:'subcategories', component:SubcategoriaComponent},
  {path:'registres', component:RegistreComponent},
  {path:'subcatedit', component:SubcateditComponent},
  {path:'regedit', component:RegeditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
