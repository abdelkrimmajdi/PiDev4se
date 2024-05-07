
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
  searchName: string = '';
  searchDuration: number = 0;
  filteredPrograms: NutrionnistProgram[] = [];

  constructor(private ServiceNut: NutritionnistService, private selectedProgramService: SelectProgramService) { }
  
  ngOnInit(): void {
    this.loadPrograms(); 
  }
  getAllProgramm() {
    this.ServiceNut.getAllProgramm().subscribe(
      (data: NutrionnistProgram[]) => {
        console.log(data);
  
        this.listProgram = data.filter(program => program.user === this.userconnect);
        console.log("Programmes filtrés :", this.listProgram);
      },
      error => {
        console.log('Error fetching programs:', error);
      }
  );
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

  applyFilters() {
    let filteredPrograms = this.listProgram;
  
    // Filtrer par nom de programme
    if (this.searchText.trim() !== '') {
      filteredPrograms = filteredPrograms.filter(program =>
        program.nameProg.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
  
    

    // Tri par durée
  
  
    this.filteredPrograms = filteredPrograms;
  }
  sortByDuration() {
    this.filteredPrograms.sort((a, b) => a.duration - b.duration);
  }

  loadPrograms() {
    this.ServiceNut.getAllProgramm().subscribe(
      (data: NutrionnistProgram[]) => {
        this.listProgram = data;
        this.applyFilters(); // Appliquer les filtres une fois les programmes chargés
      },
      error => {
        console.log('Error fetching programs:', error);
      }
    );
  }

  sortByProgramName() {
    this.filteredPrograms.sort((a, b) => a.nameProg.localeCompare(b.nameProg));
  }

  
  search() {
    // Appliquer les filtres lorsque l'utilisateur saisit dans les champs de recherche
    this.applyFilters();
  }
  searchText: string = '';
 
  filterUsers() {
    let filteredUsers = this.listProgram;

    if (this.searchText.trim() !== '') {
        filteredUsers = filteredUsers.filter(program => {
            return program.duration.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
                program.nameProg.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }

    return filteredUsers;
}

}
