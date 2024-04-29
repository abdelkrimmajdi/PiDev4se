import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/Menu';
import { MenuserviceService } from 'src/app/services/menuservice.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  listMenu: Menu[] = [];

  constructor(private router: Router, private service: MenuserviceService, private selectedProgramService: SelectProgramService) { }

  ngOnInit(): void {
    this.loadPrograms();
    console.log(this.selectedProgramService.selectedProgramId)
  }

  loadPrograms() {
    const programId = this.selectedProgramService.selectedProgramId; 
    if (programId) {
      this.service.getMenuByProgram(programId).subscribe(
        (data: Menu[]) => {
          this.listMenu = data;
          console.log(this.listMenu);
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    } else {
      console.log('Aucun programme sélectionné.');
    }
  }
}
