import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';




@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [ProductsComponent,
    CommonModule,
    RouterModule
  ]
})
export default class ProductsComponent{
  products = PRODUCTS


  productDetail?: any;

  constructor(private route: ActivatedRoute) { }


  
 
}
