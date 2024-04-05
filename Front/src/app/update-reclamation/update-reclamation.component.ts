import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.scss']
})
export class UpdateReclamationComponent {

  reclamationId: number;
  reclamationData: any = {}; // Données de la réclamation à modifier

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamationService: ReclamationService
  ) { this.reclamationId = 0;}

  ngOnInit(): void {
    // Récupérer l'ID de la réclamation à partir de l'URL
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.reclamationId = id;
        // Charger les données de la réclamation à modifier
        this.loadReclamationData();
      } else {
        console.error('ID de réclamation invalide : ', params['id']);
        // Gérer l'erreur, par exemple rediriger vers une page d'erreur
      }
    });
  }

  loadReclamationData(): void {
    // Utiliser le service pour récupérer les données de la réclamation à modifier
    this.reclamationService.getReclamationById(this.reclamationId)
      .subscribe(reclamation => {
        this.reclamationData = reclamation;
      });
  }

  updateReclamation(): void {
    // Utiliser le service pour mettre à jour la réclamation avec les nouvelles données
    this.reclamationService.updateReclamation(this.reclamationId, this.reclamationData)
      .subscribe(() => {
        console.log('Réclamation mise à jour avec succès');
        // Rediriger vers la page de liste des réclamations après la mise à jour
        this.router.navigate(['/admin/getReclamations']);
        alert('Réclamation modifiée avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour de la réclamation : ', error);
        // Gérer les erreurs de mise à jour de réclamation ici
      });
  }
}
