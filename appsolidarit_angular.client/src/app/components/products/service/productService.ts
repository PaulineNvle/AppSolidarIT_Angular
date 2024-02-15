import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../products/product-list/IProducts';

@Injectable({
  providedIn: 'root'
})
export class productService {

  constructor() { }
  private urlBase = "http://localhost:5033"


 /* product: Product = new Product();*/

  httpClient = inject(HttpClient)


// observable permet de faire des ope de facon asynchrone, veut dire


  //GET
  get(): Observable<IProduct[]> { 
    return this.httpClient.get<IProduct[]>(`${this.urlBase}/products`);
  }

  getByid(id: string) {
    return this.httpClient.get<IProduct[]>(`${this.urlBase}/products`);
  }

  //CREATE
  create(newObj: any): Observable<any> {
    return this.httpClient.post(`${this.urlBase}/products`, newObj);
  }

  //UPDATE
  update(updateObj: any): Observable<any> {
    return this.httpClient.put<IProduct[]>(`${this.urlBase}/products/${updateObj.id}`, updateObj);
  }

  // DELETE 
  delete(): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/products/`);
  }
}

// pas de htppclient, pas bonne pratique

