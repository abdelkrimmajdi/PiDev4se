import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products'; // Mettez à jour l'URL selon votre configuration

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.apiUrl);
  }

  getProductById(IdProduct: number): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${IdProduct}`);
  }

  createProduct(product: product): Observable<product> {
    return this.http.post<product>(this.apiUrl, product);
  }

  updateProduct(IdProduct: number, product: product): Observable<product> {
    return this.http.put<product>(`${this.apiUrl}/${IdProduct}`, product);
  }

  

  getProductByName(nameProd: string): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/nameProd/${nameProd}`);
  }

  deleteProduct(IdProduct: number): Observable<void> {
    const url = `${this.apiUrl}/${IdProduct}`;
    return this.http.delete<void>(url);
  }

 
}