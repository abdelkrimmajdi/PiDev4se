import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { RendezVous } from 'src/app/model/Rendez';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  list: RendezVous[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);


  constructor(private nutritionistService: NutritionnistService) { }

  ngOnInit(): void {
    this.getAppointments();
  
  }

  getAppointments(): void {
  
      this.nutritionistService.getRendezVous(this.userconnect.id).subscribe(
        (data: RendezVous[]) => {
          console.log(data);
          this.list = data;
          console.log(this.list);

        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    }

}
