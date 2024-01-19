import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    'path': 'homepage',
    title:'Accueil',
    loadComponent:() => import('./homepage/homepage.component')
  },
  {
    'path': 'products',
    title: 'Nos services',
    loadComponent: () => import('./products/products.component')
  },
  {
    'path': 'details',
    title: 'Détails du service',
    loadComponent: () => import('./details/details.component')
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
