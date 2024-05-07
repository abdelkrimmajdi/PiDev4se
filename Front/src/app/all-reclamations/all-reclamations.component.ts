import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
import { ReclamationService } from '../services/reclamation.service';

@Component({
  selector: 'app-all-reclamations',
  templateUrl: './all-reclamations.component.html',
  styleUrls: ['./all-reclamations.component.scss']
})
export class AllReclamationsComponent implements OnInit, AfterViewInit {

  reclamations: any[] = [];
  searchTerm: string = '';
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  filteredReclamations: any[] = [];
  defaultFilterState: string = 'All';
  pieChart: any;

  constructor(
    private reclamationService: ReclamationService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadReclamations();
  }

  ngAfterViewInit(): void {
    window.onload = () => { // Use window.onload to ensure all elements are loaded
      this.initPieChart();
    };
  }

  initPieChart(): void {
    const canvas = document.getElementById('pieChartCanvas') as HTMLCanvasElement;
  
    if (!canvas) {
      console.error("Canvas element with ID 'pieChartCanvas' not found in the template.");
      return;
    }
  
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error("Impossible d'obtenir le contexte du canevas.");
      return;
    }
  
    const treatedCount = this.countTreatedReclamations();
    const notTreatedCount = this.countNotTreatedReclamations();
  
    const data = {
      labels: ['Treated', 'Not Treated'],
      datasets: [{
        data: [treatedCount, notTreatedCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Distribution of Reclamations'
        }
      }
    };
  
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations()
      .subscribe(reclamations => {
        this.reclamations = reclamations;
        this.applyFilters();
      });
  }
  deleteReclamation(idReclam: number): void {
    this.reclamationService.deleteReclamation(idReclam)
      .subscribe(() => {
        console.log('Réclamation supprimée avec succès');
        alert('Réclamation supprimée avec succès');
        this.loadReclamations(); // Reload reclamations after deletion
      }, error => {
        console.error('Erreur lors de la suppression de la réclamation : ', error);
      });
  }

  editReclamation(idReclam: number): void {
    this.router.navigate(['/admin/update-reclamation', idReclam]);
  }
  repondreReclamation(): void {
    this.router.navigate(['/admin/createReponse']);
  }
  responselist(): void {
    this.router.navigate(['/admin/getResponses']);
  }

  generatePDF(): void {
    console.log('Tentative de téléchargement du PDF');
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;

    const tableClone = pdfTable.cloneNode(true);
    const actionColumn = tableClone.querySelector('th:last-child, td:last-child');
    actionColumn.parentNode.removeChild(actionColumn);

    const options = {
      html: tableClone,
      didDrawPage: (data: any) => {
        // Vous pouvez ajouter des en-têtes ou d'autres contenus à chaque page ici si nécessaire
      }
    };

    (doc as any).autoTable(options);
    doc.save
('reclamations.pdf');
  }

  filterReclamationsByState(state: string): any[] {
    return this.reclamations.filter(reclamation => reclamation.stateReclam === state);
  }

  applyFilters(): void {
    if (!this.searchTerm.trim()) {
      if (this.defaultFilterState === 'All') {
        this.filteredReclamations = this.reclamations;
      } else {
        this.filteredReclamations = this.filterReclamationsByState(this.defaultFilterState);
      }
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredReclamations = this.reclamations.filter(reclamation =>
        reclamation.idReclam.toString().toLowerCase().includes(searchTermLower) ||
        reclamation.reclamType.toLowerCase().includes(searchTermLower) ||
        reclamation.reclamDate.toLowerCase().includes(searchTermLower) ||
        reclamation.descriptionReclam.toLowerCase().includes(searchTermLower) ||
        reclamation.stateReclam.toLowerCase().includes(searchTermLower)
      );
    }
  }

  filterByState(event: any): void {
    const state = event?.target?.value;
    if (state === 'All') {
      this.filteredReclamations = this.reclamations;
    } else {
      this.filteredReclamations = this.filterReclamationsByState(state);
    }
  }

  applyDefaultFilter(): void {
    this.filterByState(this.defaultFilterState);
  }

  countTreatedReclamations(): number {
    return this.reclamations.filter(reclamation => reclamation.stateReclam === 'Treated').length;
  }

  countNotTreatedReclamations(): number {
    return this.reclamations.filter(reclamation => reclamation.stateReclam === 'NotTreated').length;
  }
}
