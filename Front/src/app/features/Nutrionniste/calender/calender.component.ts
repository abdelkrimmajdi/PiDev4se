import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  list: string[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarOptions: any = { // Changez le type de calendarOptions en any
    initialView: 'dayGridMonth',
    events: [] as EventInput[] // Définissez le type de events comme EventInput[]
  };

  constructor(private nutritionistService: NutritionnistService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.nutritionistService.getRendezVous(this.userconnect.id)
      .subscribe(appointments => {
        const eventInputs: EventInput[] = appointments.map(appointment => {
          
          const event: EventInput = {
            title: appointment, 
            start: new Date(), 
           
          };
          return event;
        });

       
        this.calendarOptions.events = eventInputs;
      }, error => {
        console.error(error);
      });
  }
}