import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponNotificationService {
  private sseUrl = 'http://localhost:8080/sse/notifications'; // Votre URL SSE

  constructor() {}

  // Méthode pour se connecter au SSE
  getCouponNotifications(cartTotal: number): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${this.sseUrl}?cartTotal=${cartTotal}`);

      eventSource.onmessage = (event) => {
        observer.next(event); // Transmettre l'événement SSE à l'observable
      };

      eventSource.onerror = (error) => {
        observer.error(error); // Gérer les erreurs SSE
        eventSource.close(); // Fermer la connexion SSE
      };

      return () => {
        eventSource.close(); // Fermer la connexion lorsqu'elle n'est plus nécessaire
      };
    });
  }
}
