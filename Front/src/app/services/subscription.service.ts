import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  private baseUrl : string = 'http://localhost:8081/subscriptions';

  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>( this.baseUrl);
  }

  getSubscriptionsById(id: number) {
    return this.http.get<Subscription>(this.baseUrl+'/'+id)
  }

  createSubscriptions(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.baseUrl, subscription);
  }

  deleteSubscriptions(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }

  updateSubscriptions(s:Subscription, id:number){
    return this.http.put(this.baseUrl + '/' + id,s);
  }

}
