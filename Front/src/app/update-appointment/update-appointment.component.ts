import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { PhysiotherapistService } from '../services/physiotherapist.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})
export class UpdateAppointmentComponent implements OnInit {
  UpdateAppointmentForm!: FormGroup;
  appointmentId: number;
  Physiotherapists: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private physiotherapistService: PhysiotherapistService
  ) {
    this.appointmentId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.UpdateAppointmentForm = this.formBuilder.group({
      dayApp: ['', Validators.required],
      timeApp: ['', Validators.required],
      physiotherapistId: ['', Validators.required]
    });
    this.loadPhysiotherapists();
    this.loadAppointmentDetails();
  }

  updateAppointment() {
    if (this.UpdateAppointmentForm.valid) {
      const formData = this.UpdateAppointmentForm.value;
      const physiotherapistId = formData.physiotherapistId;
      this.appointmentService.updateAppointment(this.appointmentId, formData).subscribe(
        (response) => {
          console.log('Appointment updated successfully:', response);
          Swal.fire('Success', 'Appointment updated successfully !', 'success');
          this.router.navigate(['/admin/getAppointments']);

        },
        (error) => {
          console.error('Error updating appointment:', error);
        }
      );
    }
  }

  loadPhysiotherapists(): void {
    this.physiotherapistService.getAllPhysiotherapists().subscribe(
      Physiotherapists => {
        this.Physiotherapists = Physiotherapists;
        console.log('Physiotherapists loaded successfully: ', Physiotherapists);
      },
      error => {
        console.error('Error loading physiotherapists: ', error);
      }
    );
  }

  loadAppointmentDetails(): void {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      (appointment) => {
        this.UpdateAppointmentForm.patchValue({
          dayApp: appointment.dayApp,
          timeApp: appointment.timeApp,
          physiotherapistId: appointment.physiotherapistId
        });
        console.log('Appointment details loaded successfully: ', appointment);

      },
      (error) => {
        console.error('Error loading appointment details: ', error);
      }
    );
  }
}
