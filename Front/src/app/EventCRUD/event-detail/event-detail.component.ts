import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Event } from 'src/app/model/Event';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  id !: number;
  event !: Event;

  constructor(private route: ActivatedRoute, private router: Router, private eventservice: EventServiceService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.event = new Event();
    this.eventservice.getEventById(this.id).subscribe(data => {
      this.event = data;
    });
  }

  tooltipClicked() {
    this.router.navigate(['/admin/all-events']);
  }
  downloadPDF() {
    const doc = new jsPDF();
    const eventDetails = `
      Name: ${this.event.name}
      Summary: ${this.event.summary}
      Location: ${this.event.location}
      Number of places available: ${this.event.nbplace}
      Start Date: ${this.event.datedebut}
      End Date: ${this.event.datefin}
    `;
    doc.text(eventDetails, 10, 10);
    doc.save('event_details.pdf');
  }
  
}
