import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-all-responses',
  templateUrl: './all-responses.component.html',
  styleUrls: ['./all-responses.component.scss']
})
export class AllResponsesComponent implements OnInit {
  responses: any[] = [];
  searchTerm: string = ''; 
  filteredResponses: any[] = []; 

  constructor(private responseService: ResponseService, private router: Router) { }

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses(): void {
    this.responseService.getAllResponses()
      .subscribe(responses => {
        this.responses = responses;
        this.filteredResponses = this.responses; 
      });
  }

  deleteResponse(idResponse: number): void {
    this.responseService.deleteResponse(idResponse)
      .subscribe(() => {
        console.log('Réponse supprimée avec succès');
        alert('Réponse supprimée avec succès');
        this.loadResponses();
      }, error => {
        console.error('Erreur lors de la suppression de la réponse : ', error);
      });
  }

  editResponse(idResponse: number): void {
    this.router.navigate(['/admin/update-response', idResponse]);
  }
  returnReclamation(): void {
    this.router.navigate(['/admin/getReclamations']);
  }

  filterResponses(): any[] {
    if (!this.searchTerm.trim()) return this.responses;
    
    const searchTermLower = this.searchTerm.toLowerCase().trim();
    return this.responses.filter(response =>
      response.idRep.toString().toLowerCase().includes(searchTermLower) ||
      response.descriptionRep.toLowerCase().includes(searchTermLower) ||
      response.dateRep.toString().toLowerCase().includes(searchTermLower) 
    );
  }

  getReclamationid(response: any): string {
    if (response.reclamation && response.reclamation.IdReclam) {
      return response.reclamation.IdReclam.toString(); 
    } else {
      return 'Réclamation non trouvée';
    }
  }
}
