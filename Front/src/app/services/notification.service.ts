import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private sseUrl = 'http://localhost:8081/api/notifications/sse';

  constructor() {}

  getServerSentEvents(
    cartTotalPrice: number,
    minTotalPrice: number,
    maxTotalPrice: number,
    couponName: string
  ): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource(
        `${this.sseUrl}?cartTotalPrice=${cartTotalPrice}&minTotalPrice=${minTotalPrice}&maxTotalPrice=${couponName}`
      );

      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
