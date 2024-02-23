import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, pipe } from 'rxjs';
import { IProduct } from '../../products/product-list/IProducts';

@Injectable({
  providedIn: 'root'
})
export class productService {

  private urlBase = "http://localhost:5033/api/Product"
  constructor(private http: HttpClient)
  { }


  //GET
  getAllProduct(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.urlBase)
      .pipe(map(response => response as IProduct[]));
  }

  //GET BY ID (THEMEid)
  getProductByThemeId(themeId: number):Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${this.urlBase}/${themeId}`);
  }

  // GET PRODUCT BY ID
  getProductById(Id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${this.urlBase}/${Id}`);
  }


  //CREATE
  addProduct(product: IProduct): Observable<any> {
    return this.http
      .post<IProduct>(this.urlBase, (product));
  }

  //UPDATE
  editProduct(product: IProduct): Observable<any> {
    return this.http
      .put<IProduct[]>(`${this.urlBase}/${product.id}`, product);
  }

  //DELETE
  deleteProduct(product: IProduct): Observable<IProduct> {
    if (confirm("Etes-vous sure de vouloir supprimer ce produit?")) {
      
      this.http
        .delete<IProduct>(`${this.urlBase}/${product.id}`)
    }
    return of(product);
  }

  //DELETE BY ID
  deleteProductById(id: number): Observable<IProduct> {
    if (confirm("Etes-vous sure de vouloir supprimer ce produit?")) {

      console.log(`${this.urlBase}/${id}`)
      return this.http
        .delete<IProduct>(`${this.urlBase}/${id}`)

    } else {
      console.log('error');
      return this.http.get<IProduct>(`${this.urlBase}/${id}`);
      
    }
  }
}
