
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES:Routes = [
  {
    path:'',  component:LayoutComponent,
    children:[
      { path: '', redirectTo: 'dashboard',pathMatch: 'full' }, 
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)},
      { path: 'subcategory', loadChildren: () => import('../subcategory/subcategory.module').then(m => m.SubcategoryModule)},
      { path: 'register', loadChildren: () => import('../register/register.module').then(m => m.RegisterModule)},   
    ]
  }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);


