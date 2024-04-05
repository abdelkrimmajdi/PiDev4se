import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-update-response',
  templateUrl: './update-response.component.html',
  styleUrls: ['./update-response.component.scss']
})
export class UpdateResponseComponent implements OnInit {

  responseId: number;
  responseData: any = {}; // Données de la réponse à modifier

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService
  ) { this.responseId = 0; }

  ngOnInit(): void {
    // Récupérer l'ID de la réponse à partir de l'URL
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.responseId = id;
        // Charger les données de la réponse à modifier
        this.loadResponseData();
      } else {
        console.error('ID de réponse invalide : ', params['id']);
        // Gérer l'erreur, par exemple rediriger vers une page d'erreur
      }
    });
  }

  loadResponseData(): void {
    // Utiliser le service pour récupérer les données de la réponse à modifier
    this.responseService.getResponseById(this.responseId)
      .subscribe(response => {
        this.responseData = response;
      });
  }

  updateResponse(): void {
    // Utiliser le service pour mettre à jour la réponse avec les nouvelles données
    this.responseService.updateResponse(this.responseId, this.responseData)
      .subscribe(() => {
        console.log('Réponse mise à jour avec succès');
        // Rediriger vers la page de liste des réponses après la mise à jour
        this.router.navigate(['/getResponses']);
        alert('Réponse modifiée avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour de la réponse : ', error);
        // Gérer les erreurs de mise à jour de réponse ici
      });
  }
}
