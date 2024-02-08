import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';
import { HttpClient } from '@angular/common/http';




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
  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Product").subscribe((data: any) => {
      console.log(data)

    })
    ngSubmit
    
  }
  



  products = PRODUCTS
  productDetail?: any;
  title = 'Nos services';
  constructor(private route: ActivatedRoute) { }


  
 
}
