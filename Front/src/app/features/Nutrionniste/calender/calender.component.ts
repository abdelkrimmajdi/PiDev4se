import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { RendezVous } from 'src/app/model/Rendez';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent  {
  list: RendezVous[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);


  constructor(private nutritionistService: NutritionnistService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
  
      this.nutritionistService.getRendezVous(this.userconnect.id).subscribe(
        (data: RendezVous[]) => {
          this.list = data;
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    }
}