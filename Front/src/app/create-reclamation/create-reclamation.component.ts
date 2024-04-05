import { Component } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';

@Component({
  selector: 'app-create-reclamation',
  templateUrl: './create-reclamation.component.html',
  styleUrls: ['./create-reclamation.component.scss']
})
export class CreateReclamationComponent {
  minLength: number = 5; // Définir la longueur minimale requise pour la description
  reclamationData: any = {
    reclamType: '',
    reclamDate: '',
    descriptionReclam: '',
    stateReclam: 'NotTreated'
  };

  constructor(private reclamationService: ReclamationService) { }

  createReclamation(): void {
    console.log('Données de réclamation à envoyer : ', this.reclamationData); // Ajoutez cette ligne pour vérifier les données

    // Vérifier si tous les champs obligatoires sont remplis
    if (!this.reclamationData.reclamType || !this.reclamationData.reclamDate || !this.reclamationData.descriptionReclam) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    // Valider la longueur minimale de la description
    if (this.reclamationData.descriptionReclam.length < this.minLength) {
      return;
    }

    // Valider les mots interdits
    const forbiddenWords = ['mot1', 'mot2', 'mot3'];
    if (this.hasForbiddenWords(this.reclamationData.descriptionReclam, forbiddenWords)) {
      // Mots interdits trouvés, afficher une alerte générale
      alert('Vous avez utilisé des mots interdits dans la description de la réclamation.');
      // Arrêter le processus de création de réclamation
      return;
    }

    // Si les mots interdits ne sont pas trouvés, continuer avec la création de la réclamation
    this.reclamationService.createReclamation(this.reclamationData)
      .subscribe(
        response => {
          console.log('Réclamation créée avec succès : ', response);
          // Réinitialiser les données du formulaire après la création réussie
          this.reclamationData = {
            reclamType: '',
            reclamDate: '',
            descriptionReclam: '',
            stateReclam: 'NotTreated',
          };
          alert('Réclamation ajoutée avec succès');
        },
        error => {
          console.error('Erreur lors de la création de la réclamation : ', error);
          // Gérer les erreurs de création de réclamation ici
        }
      );
  }

  // Méthode pour vérifier si des mots interdits sont présents dans la description de la réclamation
  hasForbiddenWords(description: string, forbiddenWords: string[]): boolean {
    const regex = new RegExp('\\b(' + forbiddenWords.join('|') + ')\\b', 'i');
    return regex.test(description);
  }
  
}
