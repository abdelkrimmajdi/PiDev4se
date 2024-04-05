import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  event: Event = new Event(); // Déclarer une instance d'Event pour stocker les détails du nouvel événement

  constructor(private eventService: EventServiceService,
    private route: ActivatedRoute,
    private router: Router) {}

  createEvent(): void {
    this.eventService.createEvent(this.event)
      .subscribe(
        response => {
          console.log(response); // Afficher la réponse du service en cas de succès
          // Réinitialiser les détails de l'événement après la création réussie
          this.event = new Event();
          // Naviguer vers la liste de tous les événements après la création réussie
          this.getAllEvents();
        },
        error => {
          console.log(error); // Afficher l'erreur en cas d'échec de la création de l'événement
        }
      );
  }

  getAllEvents() {
    // Utiliser setTimeout pour retarder la navigation vers '/admin/all-events' afin de s'assurer que la création de l'événement est bien terminée
    setTimeout(() => {
      this.router.navigate(['/admin/all-events']);
    }, 100); // ajustez la valeur de délai selon vos besoins
  }
}
