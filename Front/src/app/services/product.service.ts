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

<<<<<<< HEAD
  getProductById(idProduct: number): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${idProduct}`);
  }

  
=======
  getProductById(IdProduct: number): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${IdProduct}`);
  }

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
  createProduct(product: product): Observable<product> {
    return this.http.post<product>(this.apiUrl, product);
  }

<<<<<<< HEAD
  updateProduct(id: number, productData: product): Observable<product> {
    return this.http.put<product>(`${this.apiUrl}/${id}`, productData);
  }

=======
  updateProduct(IdProduct: number, product: product): Observable<product> {
    return this.http.put<product>(`${this.apiUrl}/${IdProduct}`, product);
  }

  

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
  getProductByName(nameProd: string): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/nameProd/${nameProd}`);
  }

<<<<<<< HEAD
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  getProductByCategory(category: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/productsByCategory/${category}`);
  }

  addToCart(product: product): Observable<product> {
    return this.http.post<product>(this.apiUrl, product);
  }
}
=======
  deleteProduct(IdProduct: number): Observable<void> {
    const url = `${this.apiUrl}/${IdProduct}`;
    return this.http.delete<void>(url);
  }

 
}
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
