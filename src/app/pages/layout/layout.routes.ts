
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { loginGuard } from 'src/app/guards/login.guard';

const LAYOUT_ROUTES:Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: "login", loadChildren: () => import('../login/login.module').then(m => m.LoginModule)},  
  {
    path:'',
    canActivate: [loginGuard],	  
    component:LayoutComponent,
    children:[
      { path: '', redirectTo: 'dashboard',pathMatch: 'full' }, 
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)},
      { path: 'subcategory', loadChildren: () => import('../subcategory/subcategory.module').then(m => m.SubcategoryModule)},
      { path: 'register', loadChildren: () => import('../register/register.module').then(m => m.RegisterModule)},   
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},   
      { path: 'passkey', loadChildren: () => import('../pass-key/pass-key.module').then(m => m.PassKeyModule)},   
    ]
  }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);


