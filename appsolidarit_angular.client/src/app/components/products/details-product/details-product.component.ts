import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { productService } from '../service/productService';
import { IProductUpdate } from '../product-list/IProductsUpdate';
import { Observable } from 'rxjs';




@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  imports: [
    CommonModule,
    RouterModule,
    NgIf,
  ],
  providers: [
    productService
  ]
})


export default class DetailsComponent implements OnInit {

  product$!: Observable<IProductUpdate>;

  constructor(
    private route: ActivatedRoute,
    private productService: productService,
    private router: Router
    ) { }
 

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if(!productId){
      console.log("No productId");
      return 
    }
    this.product$ = this.productService
      .getProductById(productId);
  }
}


