import { Component } from '@angular/core';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.scss']
})
export class ShowProgramComponent {
  listProgram: NutrionnistProgram[] = [];
  
  programss: NutrionnistProgram[] = [];
  constructor(private ServiceNut: NutritionnistService, private selectedProgramService: SelectProgramService) { }
  
  ngOnInit(): void {
    this.loadPrograms(); 

    
    
  }
  loadPrograms() {
    const userId = this.selectedProgramService.IdUser;
    if (userId) {
      this.ServiceNut.getNutrisionistProgramsByUserId(userId).subscribe(
        (data: NutrionnistProgram[]) => {
          this.listProgram = data;
     
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    }
  }
}
