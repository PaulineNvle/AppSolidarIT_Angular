import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productService } from '../service/productService';
import { IProduct } from '../../products/product-list/IProducts';


@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [ProductsComponent,
    CommonModule,
    RouterModule
  ],
  providers: [
    productService
  ]
})
export default class ProductsComponent implements OnInit{


  title = 'Page d\'accueil';
  product: IProduct | undefined;


  constructor(
    private route: ActivatedRoute,
    private productService: productService
  ) { }

  ngOnInit(): void {
    const productId = (this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      console.log("No productId");
      return
    }
    this.productService.getProductByid(productId).subscribe(p => this.product = p)
  }

}
