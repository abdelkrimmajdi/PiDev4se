import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-getallevent',
  templateUrl: './getallevent.component.html',
  styleUrls: ['./getallevent.component.scss']
})
export class GetalleventComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        console.log(events); // Vérifiez les données reçues dans la console
        this.events = events;
        this.filteredEvents = events; // Initialisation des événements filtrés avec tous les événements
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des événements:', error);
      }
    );
  }

  searchEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  Updateevent(id : number){
    this.router.navigate(['/admin/update-event',id]);
  }

  deleteEvent ( id : number) 
  {
    this.eventService.deleteEvent(id).subscribe ( data => { console.log(data);
    this.getAllEvents();})
  }

  EventDetail(id : number){
    this.router.navigate(['/admin/detail-event',id]);
  }
  createEvent() {
    this.router.navigate(['/admin/create-event']);
}
}