import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PRODUCTS } from '../mock-products';
import { ActivatedRoute, RouterModule } from '@angular/router';




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
export default class ProductsComponent implements OnInit {
  products = PRODUCTS


  productDetail?: any;

  constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  
 
}
