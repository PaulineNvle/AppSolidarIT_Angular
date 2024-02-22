import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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


  title = 'Nos services';
  product: IProduct | undefined;


  constructor(
    private route: ActivatedRoute,
    private productService: productService
  ) { }

  ngOnInit(): void {
    const themeId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(themeId);

    if (!themeId) {
      console.log("No themeId");
      return
    }
    this.productService.getProductByThemeId(themeId).subscribe(p => {
       // this.product = p;
      console.log("data", p)  
    })
  }
}
// faire un console log de  console.log("data", p) pour voir si ma fonction et mon subscribe fonctionne
