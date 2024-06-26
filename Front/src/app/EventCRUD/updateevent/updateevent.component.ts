import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventServiceService } from 'src/app/services/event-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.scss']
})
export class UpdateeventComponent implements OnInit {
 
  event: Event = new Event();
  id!: number;

  constructor(
    private eventservice: EventServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id'];
    this.eventservice.getEventById(this.id).subscribe(
      data => {
        this.event = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  Onsubmit()
  {    if (this.event.datedebut > this.event.datefin) {
    alert("Begin Date cannot be later than End Date.");
    return;
}

// Vérification de la validité du nombre de places
if (this.event.nbplace < this.event.nbplacemin) {
    alert("Number of Places cannot be less than Minimum Number of Places.");
    return;
}
    this.eventservice.updateEvent(this.id,this.event).subscribe ( data => { this.getAllEvents();}, error => console.log(error));
}
  getAllEvents() {
    setTimeout(() => {
      this.router.navigate(['/admin/all-events']);
    }, 100); // ajustez la valeur de délai selon vos besoins
  }
}
