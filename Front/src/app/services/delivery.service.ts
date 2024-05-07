import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../model/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {


  private apiUrl = 'http://localhost:8081/api/deliveries/';

  constructor(private http: HttpClient) { }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getDeliveryById(idDelivery: number): Observable<Delivery> {
    const url = `${this.apiUrl}/${idDelivery}`;
    return this.http.get<Delivery>(url);
  }

  saveDelivery(delivery: Delivery): Observable<Delivery> {
    console.log(delivery)
    return this.http.post<Delivery>(this.apiUrl + 'create', delivery);
  }

  deleteDelivery(idDelivery: number): Observable<void> {
    const url = `${this.apiUrl}${idDelivery}`;
    return this.http.delete<void>(url);
  }

  
}
