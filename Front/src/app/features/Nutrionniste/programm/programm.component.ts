import { Component } from '@angular/core';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.scss']
})
export class ProgrammComponent  {
  listProgram: NutrionnistProgram[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  programss: NutrionnistProgram[] = [];


  constructor(private ServiceNut: NutritionnistService, private selectedProgramService: SelectProgramService) { }
  
  ngOnInit(): void {
    this.loadPrograms(); 

    
    
  }
  delete(id: number) {
    this.ServiceNut.deleteProgramm(id).subscribe(() => this.getAllProgramm());
  }
  selectProgram(programId: number) {
    this.selectedProgramService.selectedProgramId = programId;
    console.log('Selected program ID:', programId);
  }

  selectProgramduration(duration: number) {
    this.selectedProgramService.duration = duration;
    console.log('Selected program ID:', duration);
  }
  getAllProgramm() {
    this.ServiceNut.getAllProgramm().subscribe(
      (data: NutrionnistProgram[]) => {
        console.log(data);
        // Filtrer les programmes pour n'afficher que ceux de l'utilisateur connecté
        this.listProgram = data.filter(program => program.user === this.userconnect);
        console.log("Programmes filtrés :", this.listProgram);
      },
      error => {
        console.log('Error fetching programs:', error);
      }
  );
  }
  loadPrograms() {
    const userId = this.userconnect.id; 
    this.ServiceNut.getNutrisionistProgramsByUserId(userId).subscribe(
      (data: NutrionnistProgram[]) =>  {
        this.listProgram = data;
     
      },
      error => {
        console.log('Error fetching programs:', error);
      }
    );
  }

  
 
}
