import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, pipe } from 'rxjs';
import { IProductUpdate } from '../product-list/IProductsUpdate';
import { IProductCreate } from '../product-list/IProductsCreate';

@Injectable({
  providedIn: 'root'
})
export class productService {

  private urlBase = "http://localhost:5033/api/Product"
  constructor(private http: HttpClient)
  { }


  //GET
  getAllProduct(): Observable<IProductUpdate[]> {
    return this.http
      .get<IProductUpdate[]>(this.urlBase)
      .pipe(map(response => response as IProductUpdate[]));
  }

  //GET BY ID (THEMEid)
  getProductByThemeId(themeId: number):Observable<IProductUpdate[]> {
    return this.http
      .get<IProductUpdate[]>(`${this.urlBase}/?themeId=${themeId}`);
  }

  // GET PRODUCT BY ID
  getProductById(Id: number): Observable<IProductUpdate> {
    return this.http
      .get<IProductUpdate>(`${this.urlBase}/${Id}`);
  }


  //CREATE
  addProduct(product: IProductCreate): Observable<any> {
    return this.http
      .post<IProductCreate>(this.urlBase, (product));
  }

  //UPDATE
  editProduct(product: IProductUpdate): Observable<any> {
    return this.http
      .put<IProductUpdate[]>(`${this.urlBase}/${product.id}`, product);
  }

  //DELETE
  deleteProduct(product: IProductUpdate): Observable<IProductUpdate> {
    if (confirm("Etes-vous sure de vouloir supprimer ce produit?")) {
      
      this.http
        .delete<IProductUpdate>(`${this.urlBase}/${product.id}`)
    }
    return of(product);
  }

  //DELETE BY ID
  deleteProductById(id: number): Observable<IProductUpdate> {
    if (confirm("Etes-vous sure de vouloir supprimer ce produit? ")) {

      console.log(`${this.urlBase}/${id}`)
      return this.http
        .delete<IProductUpdate>(`${this.urlBase}/${id}`)

    } else {
      console.log('error');
      return this.http.get<IProductUpdate>(`${this.urlBase}/${id}`);
      
    }
  }
}
