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
    event: Event = new Event(); // Instance d'Event pour stocker les détails du nouvel événement

    constructor(
        private eventService: EventServiceService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    createEvent(): void {
        // Vérification de la validité des dates avant de soumettre l'événement
        if (this.event.datedebut > this.event.datefin) {
            alert("Begin Date cannot be later than End Date.");
            return;
        }

        // Vérification de la validité du nombre de places
        if (this.event.nbplace < this.event.nbplacemin) {
            alert("Number of Places cannot be less than Minimum Number of Places.");
            return;
        }

        // Soumettre l'événement si toutes les validations sont satisfaites
        this.eventService.createEvent(this.event)
            .subscribe(
                response => {
                    console.log(response);
                    // Réinitialiser l'événement après une création réussie
                    this.event = new Event();
                    // Naviguer vers la liste des événements
                    this.getAllEvents();
                },
                error => {
                    console.log(error);
                }
            );
    }

    getAllEvents(): void {
        // Navigue vers la page des événements
        setTimeout(() => {
            this.router.navigate(['/admin/all-events']);
        }, 100);
    }
}
