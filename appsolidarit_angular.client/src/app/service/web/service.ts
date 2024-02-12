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
  httpClient = inject(HttpClient)

  //GET
  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.urlBase}/products`);
  }

  //CREATE
  create(newObj: any): Observable<any> {
    return this.httpClient.post(`${this.urlBase}/products`, newObj);
  }
  //UPDATE
  update(updateObj: any): Observable<any> {
    return this.httpClient.patch<Product[]>(`${this.urlBase}/products/${updateObj.id}`, updateObj);
  }
  // DELETE 
  delete(): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/products/`);
  }

  onSubmit(inputdata: object) {
    return this.httpClient.post('http://localhost:5033/products', inputdata);
  }
}

// pas de htppclient, pas bonne pratique

