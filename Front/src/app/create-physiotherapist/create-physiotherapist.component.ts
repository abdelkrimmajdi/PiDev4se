import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PhysiotherapistService } from '../services/physiotherapist.service';


@Component({
  selector: 'app-create-physiotherapist',
  templateUrl: './create-physiotherapist.component.html',
  styleUrls: ['./create-physiotherapist.component.scss']
})
export class CreatePhysiotherapistComponent implements OnInit {
  minLength: number = 5;
  miinLength: number = 4;
  physiotherapistData: any = {
    phyname: '',
    latitude:'',
    longitude:'',
    ville:'',   
  };

  constructor(
    private physiotherapistService: PhysiotherapistService,
    private router: Router // Inject Router here
  ) { }

  ngOnInit(): void {
  }

  createPhysiotherapist(): void {
    if (!this.physiotherapistData.phyname || !this.physiotherapistData.latitude || !this.physiotherapistData.longitude || !this.physiotherapistData.ville) {
      alert('Please complete all fields on the form.');
      return;
    }
    // Valider la longueur minimale de la description
    if (this.physiotherapistData.phyname.length < this.minLength) {
      return;
    } if (this.physiotherapistData.ville.length < this.miinLength) {
      return;
    }
    console.log('Données du physiothérapeute à envoyer : ', this.physiotherapistData);

    this.physiotherapistService.createPhysiotherapist(this.physiotherapistData)
      .subscribe(
        response => {
          console.log('Physiothérapeute créé avec succès : ', response);
          this.physiotherapistData = {
            phyname: '',
            latitude:'',
            longitude:'',
            ville:'',
          };
          Swal.fire('Success', 'Appointment created successfully', 'success');
          this.router.navigate(['/admin/getPhysiotherapists']);

        },
        error => {
          console.error('Erreur lors de la création du physiothérapeute : ', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du physiothérapeute', 'error');


        }
      );
  }

  map(): void {
    window.open('/map', '_blank');
  }
  phy(): void {
    this.router.navigate(['/admin/getPhysiotherapists']);
  }
}
