import { AuthGuard, AuthGuardReverse } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule', canActivate: [AuthGuard] },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule', canActivate: [AuthGuardReverse] },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuard] },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
