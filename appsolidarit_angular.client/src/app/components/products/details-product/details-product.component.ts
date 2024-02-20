import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { mockProducts } from '../../products/product-list/mock-products';
import { productService } from '../service/productService';
import { IProduct } from '../product-list/IProducts';





@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  imports: [
    CommonModule,
    RouterModule,
    NgIf
  ],
  providers: [
    productService
  ]
})


export default class DetailsComponent implements OnInit {

  products = mockProducts;
  title = "Details";
  product: IProduct |undefined;

  constructor(
    private route: ActivatedRoute,
    private productService : productService
    ) { }
 

  ngOnInit(): void {
    const productId = (this.route.snapshot.paramMap.get('id'));
    if(!productId){
      console.log("No productId");
      return 
    }
    this.productService.getProductByid(productId).subscribe(p => this.product = p)
  }

}
