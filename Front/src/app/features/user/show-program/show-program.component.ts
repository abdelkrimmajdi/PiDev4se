import { Component } from '@angular/core';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.scss']
})
export class ShowProgramComponent {
  listProgram: NutrionnistProgram[] = []; 
    
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
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
  selectProgram(programId: number) {
    this.selectedProgramService.selectedProgramId = programId;
    console.log('Selected program ID:', programId);
  }
  affectNutritionistProgramsToUser(): void {
    const programId = this.selectedProgramService.selectedProgramId;
    if (!programId) {
      console.error('Aucun programme sélectionné !');
      return;
    }
    this.ServiceNut.affectNutritionistProgramsToUser(this.userconnect.id, programId).subscribe(
      () => {
        console.log('Programme nutritionnel affecté à l\'utilisateur avec succès !');
       
      },
      (error) => {
        console.error('Erreur lors de l\'affectation du programme nutritionnel à l\'utilisateur : ', error);

      }
    );
  }
}
