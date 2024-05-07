import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../model/Cart';
import { Mail } from '../model/Mail';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8081/api/carts'; 

  constructor(private http: HttpClient, private router: Router) { }

  getCartss(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  
  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  deleteCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}`);
  }
  sendEmailMarket(mail:Mail): Observable<any> {
    return this.http.post<any>('http://localhost:8081/api/products/sendemail/market', mail);
  }

  getChatBotThread(): Observable<any> {
    return this.http.get(`http://localhost:5000/start`);
  }

  sendMessageToBot(message: any): Observable<any> {
    return this.http.post(`http://localhost:5000/ask`, message);
  }
}