import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysiotherapistService } from '../services/physiotherapist.service';


@Component({
  selector: 'app-update-physiotherapist',
  templateUrl: './update-physiotherapist.component.html',
  styleUrls: ['./update-physiotherapist.component.scss']
})
export class UpdatePhysiotherapistComponent implements OnInit {

  physiotherapistId: number;
  physiotherapistData: any = {}; // Données du physiothérapeute à modifier

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private physiotherapistService: PhysiotherapistService
  ) { this.physiotherapistId = 0; }

  ngOnInit(): void {
    // Récupérer l'ID du physiothérapeute à partir de l'URL
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.physiotherapistId = id;
        // Charger les données du physiothérapeute à modifier
        this.loadPhysiotherapistData();
      } else {
        console.error('ID de physiothérapeute invalide : ', params['id']);
        // Gérer l'erreur, par exemple rediriger vers une page d'erreur
      }
    });
  }

  loadPhysiotherapistData(): void {
    // Utiliser le service pour récupérer les données du physiothérapeute à modifier
    this.physiotherapistService.getPhysiotherapistById(this.physiotherapistId)
      .subscribe(physiotherapist => {
        this.physiotherapistData = physiotherapist;
      });
  }

  updatePhysiotherapist(): void {
    // Utiliser le service pour mettre à jour le physiothérapeute avec les nouvelles données
    this.physiotherapistService.updatePhysiotherapist(this.physiotherapistId, this.physiotherapistData)
      .subscribe(() => {
        console.log('Physiothérapeute mis à jour avec succès');
        // Rediriger vers la page de liste des physiothérapeutes après la mise à jour
        this.router.navigate(['/admin/getPhysiotherapists']);
        alert('Physiothérapeute modifié avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour du physiothérapeute : ', error);
        // Gérer les erreurs de mise à jour de physiothérapeute ici
      });
  }
}
