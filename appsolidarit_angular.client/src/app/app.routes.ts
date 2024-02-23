import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import DetailsComponent from './components/products/details-product/details-product.component';
import HomepageComponent from './components/products/homepage/homepage.component';
import { EditComponent } from './components/products/edit/edit-product.component';
import { AddComponent } from './components/products/add-product/add-product.component';
import ProductsComponent from './components/products/product-list/products.component';


export const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'product/:themeId',
    component: ProductsComponent,
    title: 'Nos services',
  },
  {
    'path': 'details/:id',
    component: DetailsComponent,
    title: 'Détail fiche produit',
  },
  {
    'path': 'dialog/add',
    component: AddComponent,
    title: 'Ajouter un produit',
  },
  {
    'path': 'dialog/edit/:id',
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
