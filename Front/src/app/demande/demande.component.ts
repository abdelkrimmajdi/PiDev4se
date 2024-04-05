import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Demande } from '../model/Demande';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  public demandes!:any[];  
  demande:any = new Demande(); 

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.getDemandes();
  }

  getDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (response: Demande[]) => {
        this.demandes = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); 
  }

  acc(id: number): void {
    this.demandeService.accepterDemande(id).subscribe(
      () => { 
        location.reload();
      }
    ); 
  }

  ref(id: number): void {
    this.demandeService.rejeterDemande(id).subscribe(
      () => { 
        location.reload();
      }
    ); 
  }
}
