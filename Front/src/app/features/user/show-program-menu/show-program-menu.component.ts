import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/Menu';
import { MenuserviceService } from 'src/app/services/menuservice.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-show-program-menu',
  templateUrl: './show-program-menu.component.html',
  styleUrls: ['./show-program-menu.component.scss']
})
export class ShowProgramMenuComponent {
  listMenu: Menu[] = [];
  pagedMenu: Menu[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  pageNumbers: number[] = [];

  constructor(private router: Router, private service: MenuserviceService, private selectedProgramService: SelectProgramService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    const programId = this.selectedProgramService.selectedProgramId; 
    if (programId) {
      this.service.getMenuByProgram(programId).subscribe(
        (data: Menu[]) => {
          this.listMenu = data;
          this.updatePagedMenu();
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    } else {
      console.log('Aucun programme sélectionné.');
    }
  }

  updatePagedMenu() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.listMenu.length);
    this.pagedMenu = this.listMenu.slice(startIndex, endIndex);
    this.generatePageNumbers();
  }

  generatePageNumbers() {
    const totalPages = Math.ceil(this.listMenu.length / this.pageSize);
    this.pageNumbers = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagedMenu();
  }
}
