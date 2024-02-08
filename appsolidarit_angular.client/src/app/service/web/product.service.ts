import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interface-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private urlBase = "http://localhost:5033"
  httpClient = inject(HttpClient)

  //GET
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.urlBase}/products`);
  }

  //CREATE
  createData(productToCreate: any): Observable<any> {
    return this.httpClient.post(`${this.urlBase}/products`, productToCreate);
  }
  //UPDATE
  updateProduct(objToUpdate: any): Observable<any> {
    return this.httpClient.patch<Product[]>(`${this.urlBase}/products/${objToUpdate.id}`, objToUpdate);
  }
  // DELETE 
  deleteProduct(): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/products/`);
  }
}
