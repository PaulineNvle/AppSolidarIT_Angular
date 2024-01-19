import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ProductsComponent from './components/products/products.component';
import HomepageComponent from './components/homepage/homepage.component';
import DetailsComponent from './components/details/details.component';

export const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,
    //loadComponent: () => import('./components/homepage/homepage.component'),
    pathMatch: 'full',
  },
  {
    path: 'products',
    title: 'Nos services',
    component: ProductsComponent
    //loadComponent: () => import('./products/products.component')
  },
  {
    'path': 'details',
    title: 'Détails du service',
    component: DetailsComponent,
   //loadComponent: () => import('./details/details.component')
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
