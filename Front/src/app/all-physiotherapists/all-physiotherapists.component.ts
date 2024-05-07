import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import {Chart, ChartConfiguration } from 'chart.js/auto';
import { PhysiotherapistService } from '../services/physiotherapist.service';


@Component({
  selector: 'app-all-physiotherapists',
  templateUrl: './all-physiotherapists.component.html',
  styleUrls: ['./all-physiotherapists.component.scss']
})
export class AllPhysiotherapistsComponent implements OnInit {
  physiotherapists: any[] = [];
  searchTerm: string = ''; // Nouvelle propriété pour le terme de recherche
  filteredPhysiotherapists: any[] = []; // Array pour stocker les physiothérapeutes filtrés
  showDashboard: boolean = true;
  @ViewChild('cityChartCanvas') cityChartCanvas!: ElementRef;
  cityChart: any;



  constructor(private physiotherapistService: PhysiotherapistService, private router: Router) { }

  ngOnInit(): void {
    this.loadPhysiotherapists();
  }

  loadPhysiotherapists(): void {
    this.physiotherapistService.getAllPhysiotherapists()
      .subscribe(physiotherapists => {
        this.physiotherapists = physiotherapists;
        this.filteredPhysiotherapists = this.physiotherapists; 
        this.initCityChart(); // Initialiser les physiothérapeutes filtrés avec tous les physiothérapeutes chargés
      });
  }

  deletePhysiotherapist(idPhysio: number): void {
    this.physiotherapistService.deletePhysiotherapist(idPhysio)
      .subscribe(() => {
        console.log('Physiothérapeute supprimé avec succès');
        alert('Physiothérapeute supprimé avec succès');
        // Rafraîchir la liste des physiothérapeutes après suppression
        this.loadPhysiotherapists();
      }, error => {
        console.error('Erreur lors de la suppression du physiothérapeute : ', error);
        // Gérer les erreurs de suppression de physiothérapeute ici
      });
  }

  editPhysiotherapist(idPhysio: number): void {
    // Rediriger vers la page de modification avec l'ID du physiothérapeute
    this.router.navigate(['/admin/update-physiotherapist', idPhysio]);
  }

  // Méthode de filtrage des physiothérapeutes
  filterPhysiotherapists(): any[] {
    if (!this.searchTerm.trim()) return this.physiotherapists; // Si le champ de recherche est vide, retourner tous les physiothérapeutes

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    return this.physiotherapists.filter(physiotherapist =>
      physiotherapist.idPhy.toString().toLowerCase().includes(searchTermLower) ||
      physiotherapist.phyname.toLowerCase().includes(searchTermLower) 
    );
  }
  initCityChart(): void {
    const canvas = this.cityChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    let cities: Record<string, number> = {};
    this.filteredPhysiotherapists.forEach(physiotherapist => {
      if (cities[physiotherapist.ville]) {
        cities[physiotherapist.ville]++;
      } else {
        cities[physiotherapist.ville] = 1;
      }
    });

    const labels = Object.keys(cities);
    const data = Object.values(cities);

    const chartConfig: ChartConfiguration<'bar', number[], string> = { // Définissez le type de configuration de graphique
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Physiotherapists number',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Définir le pas de l'échelle à 1 pour afficher uniquement des entiers naturels
              precision: 0 // Spécifier que les graduations doivent être des entiers
            }
          }
        }
      }
    };

    this.cityChart = new Chart(ctx, chartConfig);
  }
}