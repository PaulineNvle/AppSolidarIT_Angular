import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ProductsComponent from './components/products/products.component';
import DetailsComponent from './components/details/details.component';
import HomepageComponent from './components/homepage/homepage.component';
import { AddComponent } from './components/dialog/add/add.component';
import { EditComponent } from './components/dialog/edit/edit.component';



export const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Nos services',
  },
  {
    'path': 'details',
    component: DetailsComponent,
    title: 'Détails du service',
  },
  {
    'path': 'dialog/add',
    component: AddComponent,
    title: 'Ajouter un produit',
  },
  {
    'path': 'dialog/edit',
    component: EditComponent,
    title: 'Editer un produit',
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
