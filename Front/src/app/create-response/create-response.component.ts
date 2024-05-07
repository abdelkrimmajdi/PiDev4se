import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: ['./create-response.component.scss']
})
export class CreateResponseComponent implements OnInit {
  responseData: any = {
    descriptionRep: '',
    dateRep: '',
    idReclam: null
  };
  reclamations: any[] = [];

  constructor(private responseService: ResponseService, private reclamationService: ReclamationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadReclamations();
  }

  createResponse(): void {
    console.log('Données de réponse à envoyer : ', this.responseData);

    this.responseService.createResponse(this.responseData)
      .subscribe(
        response => {
          console.log('Réponse créée avec succès : ', response);
          this.responseData = {
            descriptionRep: '',
            dateRep: '',
            idReclam: null
          };
          this.router.navigate(['/admin/getResponses']);
          alert('Réponse ajoutée avec succès');
        },
        error => {
          console.error('Erreur lors de la création de la réponse : ', error);
        }
      );
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations()
      .subscribe(
        reclamations => {
          this.reclamations = reclamations;
          console.log('Réclamations chargées avec succès : ', reclamations);
        },
        error => {
          console.error('Erreur lors du chargement des réclamations : ', error);
        }
      );
  }

 onReclamationSelect(reclamationId: string): void {
  this.responseData.idReclam = parseInt(reclamationId, 10);
}
  
}
