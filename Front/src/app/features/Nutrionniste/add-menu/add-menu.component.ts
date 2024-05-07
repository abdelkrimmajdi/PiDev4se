import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/Menu';
import { MenuserviceService } from 'src/app/services/menuservice.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent {
  listMenu: Menu[] = [];
  currentPage: number = 0;
  pageSize: number = 4; // Nombre de formulaires par page
  AddProgramForm: FormGroup;

  constructor(
    private router: Router,
    private service: MenuserviceService,
    private selectedProgramService: SelectProgramService,
    private formBuilder: FormBuilder
  ) {
    this.AddProgramForm = this.formBuilder.group({
      calories: ['', Validators.required],
      meal: ['', Validators.required],
      day: ['', Validators.required],
      repas: ['', Validators.required],
      programId: [this.selectedProgramService.selectedProgramId]
    });
  }

  ngOnInit() {
    console.log(this.selectedProgramService.selectedProgramId);
  }

  saveProgram(): void {
    const duration = this.selectedProgramService.duration;
    const programId = this.selectedProgramService.selectedProgramId;
    if (duration && programId) {
      if (this.listMenu.length < duration) {
      
        const formData = this.AddProgramForm.value;
        this.service.saveMenu(formData as any, programId)
          .subscribe({
            next: (response: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Menu added successfully.',
                text: 'Menu added successfully.',
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: (error) => {
              console.error('Error while saving Menu:', error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur est survenue',
                footer: 'Veuillez réessayer'
              });
            }
          });
      }
    } else {
      console.log('Aucun programme sélectionné.');
    }
  }

  generateIndices(): number[] {
    const duration = this.selectedProgramService.duration;
    
    if (duration) {
      const indices = Array.from({ length: duration }, (_, i) => i);
    
      return indices.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
    }
    else
  return []
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages() - 1) {
      this.currentPage++;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
  const duration = this.selectedProgramService.duration;
  if (duration) {
    return Math.ceil(duration / this.pageSize);
  } else {
    return 0;
  }
}
  daysOfWeek: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  Plat: string[] = [ 'Breakfast','Lunch','Dinner'];

  getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
}
