import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/Menu';
import { MenuserviceService } from 'src/app/services/menuservice.service';
import { SelectProgramService } from 'src/app/services/select-program.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as QRCode from 'qrcode';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-show-program-menu',
  templateUrl: './show-program-menu.component.html',
  styleUrls: ['./show-program-menu.component.scss']
})
export class ShowProgramMenuComponent {
  listMenu: Menu[] = [];
  pagedMenu: Menu[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  constructor(private router: Router, private service: MenuserviceService, private selectedProgramService: SelectProgramService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    const programId = this.selectedProgramService.selectedProgramId;
    if (programId) {
      this.service.getMenuByProgram(programId).subscribe(
        (data: Menu[]) => {
          this.listMenu = data;
          this.updatePagedMenu();
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    } else {
      console.log('Aucun programme sélectionné.');
    }
  }

  updatePagedMenu() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.listMenu.length);
    this.pagedMenu = this.listMenu.slice(startIndex, endIndex);
    this.generatePageNumbers();
  }

  generatePageNumbers() {
    const totalPages = Math.ceil(this.listMenu.length / this.pageSize);
    this.pageNumbers = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagedMenu();
  }

  generatePDF(): void {
    const doc = new jsPDF('landscape'); // Définir le mode paysage
    
    const xOffset = 10;
    const yOffset = 10;
    const cardWidth = 80;
    const cardHeight = 60;
    const gap = 10; // Espacement entre les colonnes de cartes
    const cardColor = [192, 192, 192]; // Couleur du fond des cartes (gris)
  
    let remainingMenu = this.listMenu.length;
    let startIndex = 0;
    let pageNum = 1;
  
    while (remainingMenu > 0) {
      if (pageNum > 1) {
        doc.addPage();
      }
  
      const currentGroup = this.listMenu.slice(startIndex, startIndex + this.pageSize);
      currentGroup.forEach((menu, index) => {
        const xPosition = xOffset + ((index % 3) * (cardWidth + gap));
        const yPosition = yOffset + (Math.floor(index / 3) * (cardHeight + gap));
        
        // Dessiner une carte
        doc.setFillColor(cardColor[0], cardColor[1], cardColor[2]); // Couleur de fond de la carte
        doc.roundedRect(xPosition, yPosition, cardWidth, cardHeight, 3, 3, 'F'); // Dessiner la carte avec des coins arrondis
  
        // Ajouter du texte
        doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
        doc.setFontSize(10); // Taille de la police
        doc.text(`Day: ${menu.day}`, xPosition + 5, yPosition + 10);
        doc.text(`Meal: ${menu.repas}`, xPosition + 5, yPosition + 20);
        doc.text(`Meal: ${menu.meal}`, xPosition + 5, yPosition + 30);
        doc.text(`Calories: ${menu.calories}`, xPosition + 5, yPosition + 40);
      });
  
      remainingMenu -= this.pageSize;
      startIndex += this.pageSize;
      pageNum++;
    }
  
    doc.save('menu.pdf');
  }
  
  generateQRCode(content: string): void {
    const searchQuery = encodeURIComponent(content); 
    const youtubeURL = `https://www.youtube.com/results?search_query=${searchQuery}`;
  
    // Générer le code QR avec le lien YouTube
    QRCode.toDataURL(youtubeURL, { errorCorrectionLevel: 'H' }, (err: any, qrCodeDataURL: any) => {
      if (err) {
        console.error('Erreur lors de la génération du code QR :', err);
        return;
      }
      
      // Afficher le code QR dans une SweetAlert
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeDataURL;
      
      Swal.fire({
        title: 'Code QR',
        html: `<img src="${qrCodeDataURL}" style="max-width: 100%;">`, // Utiliser l'image du code QR
        showCloseButton: true,
        showConfirmButton: false
      });
    });
}

  
  
  
}
