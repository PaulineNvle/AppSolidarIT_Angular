import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ProductsComponent from './components/products/products.component';
import HomepageComponent from './components/homepage/homepage.component';
import DetailsComponent from './components/details/details.component';

export const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,

    pathMatch: 'full',
  },
  {
    path: 'products',
    title: 'Nos services',
    component: ProductsComponent

  },
  {
    'path': 'details',
    title: 'Détails du service',
    component: DetailsComponent,

  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
