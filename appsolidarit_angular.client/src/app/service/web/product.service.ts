import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  httpClient = inject(HttpClient)

  public getALL(): Observable<any> {
    return this.httpClient.get('');
}
