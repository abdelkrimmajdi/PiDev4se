import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { User } from 'src/app/model/user.model';
import { CustomValidators } from 'src/app/model/validator';  

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {
  listUser: User[] = [];
  selectedNutritionistId: number | null = null;
  selectedDateTime: string | null = null;
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(private Service: NutritionnistService) { }

  rendezVousForm = new FormGroup({
    dateTime: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    nutritionistId: new FormControl('', Validators.required)
  });
  
  createRendezVous(): void {
    if (this.rendezVousForm.valid) {
      const formData = this.rendezVousForm.value;
      console.log(formData);
     
      this.Service.CreateRendezVous(formData as any, this.userconnect.id, formData.nutritionistId as any).subscribe(response => {

        console.log('Rendez-vous créé avec succès:', response);
        this.rendezVousForm.reset();
      }, error => {
        console.error('Erreur lors de la création du rendez-vous:', error);
      });
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
  
  ngOnInit(): void {
    this.Service.getAllNutritionnists().subscribe((res: any) => {
      this.listUser = res;
    });
  }
  
  filterWeekends = (date: Date | null) => {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6; // Exclure le dimanche (0) et le samedi (6)
  }
  filterHours = (date: Date | null): boolean => {
    // Récupérer l'heure de la date sélectionnée
    const selectedHour = (date || new Date()).getHours();
    
    // Filtrer les heures selon vos critères
    return selectedHour >= 9 && selectedHour < 16 && selectedHour !== 13;
  }
  availableHours: string[] = []; // Déclarer une variable pour stocker les heures disponibles

  onNutritionistChange(event: any): void {
    this.selectedNutritionistId = event.target.value;
    console.log('Selected Nutritionist ID:', this.selectedNutritionistId);
    this.getAvailableHours();
  }

  // Méthode pour stocker la valeur sélectionnée de la date et de l'heure
  
  // Méthode pour stocker la valeur sélectionnée de la date et de l'heure
onDateTimeChange(event: any): void {
  const selectedDate = event.target.value;
  this.selectedDateTime = selectedDate;
  console.log('Selected Date:', this.selectedDateTime);
  this.getAvailableHours();
}

  
  getAvailableHours(): void {
    if (this.selectedDateTime && this.selectedNutritionistId) {
      this.Service.availableHours(this.selectedDateTime, this.selectedNutritionistId)
        .subscribe(hours => {
      console.log('Selected Date:', this.selectedDateTime);
          this.availableHours = hours; 
          console.log(this.availableHours)
        }, error => {
          console.error(error);
        });
    }
  }
  }

