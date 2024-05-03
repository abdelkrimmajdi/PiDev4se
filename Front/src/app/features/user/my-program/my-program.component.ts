import { Component } from '@angular/core';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-my-program',
  templateUrl: './my-program.component.html',
  styleUrls: ['./my-program.component.scss']
})
export class MyProgramComponent {
  listProgram: NutrionnistProgram[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  programss: NutrionnistProgram[] = [];
  constructor(private ServiceNut: NutritionnistService, private selectedProgramService: SelectProgramService){}
  ngOnInit(): void {
    this.loadPrograms(); 

    
    
  }
  loadPrograms() {
    const userId = this.userconnect.id; 
    this.ServiceNut.getProgramsByUserId(userId).subscribe(
      (data: NutrionnistProgram[]) =>  {
        this.listProgram = data;
     
      },
      error => {
        console.log('Error fetching programs:', error);
      }
    );
  }
  selectProgram(programId: number) {
    this.selectedProgramService.selectedProgramId = programId;
    console.log('Selected program ID:', programId);
  }

  selectProgramduration(duration: number) {
    this.selectedProgramService.duration = duration;
    console.log('Selected program ID:', duration);
  }
}
