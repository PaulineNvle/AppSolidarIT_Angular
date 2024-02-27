import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productService } from '../service/productService';
import { IProductUpdate } from '../../products/product-list/IProductsUpdate';
import { Observable } from 'rxjs';




@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [ProductsComponent,
    CommonModule,
    RouterModule,
    NgIf,
    NgFor
  ],
  providers: [
    productService
  ]
})
export default class ProductsComponent implements OnInit{

  product$!: Observable<IProductUpdate[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: productService
  ) { }

  ngOnInit(): void {
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'));
    if (!themeId) {
      console.log("No themeId");
      return
    }
    this.product$ = this.productService
      .getProductByThemeId(themeId)
  }

}
