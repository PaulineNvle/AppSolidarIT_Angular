import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { mockProducts } from '../../products/product-list/mock-products';
import { productService } from '../service/productService';
import { HttpClient } from '@angular/common/http';





@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    productService
  ]
})


export default class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  products = mockProducts;
  title = "Details";

  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)

  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Product").subscribe((data: any) => {
      console.log(data)
    })
  }

}
