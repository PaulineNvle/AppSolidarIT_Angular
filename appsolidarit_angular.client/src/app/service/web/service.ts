import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interface-products';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor() { }
  private urlBase = "http://localhost:5033"


 /* product: Product = new Product();*/

  httpClient = inject(HttpClient)

  //GET
  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.urlBase}/products`);
  }

  getByid(id: string) {
    return this.httpClient.get<Product[]>(`${this.urlBase}/products`);
  }

  //CREATE
  create(newObj: any): Observable<any> {
    return this.httpClient.post(`${this.urlBase}/products`, newObj);
  }

  //UPDATE
  update(updateObj: any): Observable<any> {
    return this.httpClient.put<Product[]>(`${this.urlBase}/products/${updateObj.id}`, updateObj);
  }

  // DELETE 
  delete(): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/products/`);
  }
}

// pas de htppclient, pas bonne pratique

