import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from '../services/appointment.service';
import { PhysiotherapistService } from '../services/physiotherapist.service';


 
@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  AddProgramForm!: FormGroup; // Utilisation de l'assertion de définition définitive
  Physiotherapists: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private physiotherapistService: PhysiotherapistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AddProgramForm = this.formBuilder.group({
      dayApp: ['', Validators.required],
      timeApp: ['', Validators.required],
      physiotherapistId: ['', Validators.required]
    });
    this.loadPhysiotherapists();
  }

  createNewAppointment() {
    
     
      const formData = this.AddProgramForm.value;
      const physiotherapistId = formData.physiotherapistId;
      const dayApp = formData.dayApp;
      const timeApp = formData.timeApp;

      if (!physiotherapistId || !dayApp || !timeApp) {
        alert('Please complete all fields on the form.');
        return;
      }
      // Vérifier l'existence d'un rendez-vous similaire
      this.appointmentService.checkSimilarAppointmentExists(physiotherapistId, dayApp, timeApp)
        .subscribe(
          exists => {
            if (exists) {
              // Afficher une alerte si un rendez-vous similaire existe déjà
              alert('This appointment is already taken, please choose another one');
            } else {
              // Si aucun rendez-vous similaire n'existe, créer le rendez-vous
              this.appointmentService.createAppointment(physiotherapistId, formData).subscribe(
                (response) => {
                  console.log('Appointment created successfully:', response);
                  Swal.fire('Success', 'Appointment created successfully, if you want to do any changes, just contact us !', 'success');
                },
                (error) => {
                  console.error('Error creating appointment:', error);
                  Swal.fire('Error', 'Error creating appointment', 'error');

                }
              );
            }
          },
          error => {
            console.error('Error checking similar appointment:', error);
            // Gérer l'erreur si la vérification du rendez-vous similaire échoue
            alert('Une erreur s\'est produite lors de la vérification de la disponibilité du rendez-vous.');
          }
        );
    
  }
  
  
  

  loadPhysiotherapists(): void {
    this.physiotherapistService.getAllPhysiotherapists()
      .subscribe(
        Physiotherapists => {
          this.Physiotherapists = Physiotherapists;
          console.log('Physiotherapists loaded successfully: ', Physiotherapists);
        },
        error => {
          console.error('Error loading physiotherapists: ', error);
        }
      );
  }
  map(): void {
    window.open('/map', '_blank');
  }
}
