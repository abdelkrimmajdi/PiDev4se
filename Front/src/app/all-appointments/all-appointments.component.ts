import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import {Chart, ChartConfiguration } from 'chart.js/auto';
import Swal from 'sweetalert2';
import { AppointmentService } from '../services/appointment.service';


@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.scss']
})
export class AllAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  searchTerm: string = '';
  @ViewChild('physiotherapistChartCanvas') physiotherapistChartCanvas!: ElementRef;
  cityChart: any;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments()
      .subscribe(appointments => {
        this.appointments = appointments;
        this.filteredAppointments = this.appointments;
        this.initPhysiotherapistChart();
      });
  }

  initPhysiotherapistChart(): void {
    const canvas = this.physiotherapistChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    let physiotherapists: Record<number, number> = {}; // Utilisation de l'ID du physiothérapeute comme clé
    this.filteredAppointments.forEach(appointment => {
      const physiotherapistId = appointment.physiotherapistId;
      if (physiotherapists[physiotherapistId]) {
        physiotherapists[physiotherapistId]++;
      } else {
        physiotherapists[physiotherapistId] = 1;
      }
    });

    const labels = Object.keys(physiotherapists);
    const data = Object.values(physiotherapists);

    const chartConfig: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Appointments number',
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
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    };

    this.cityChart = new Chart(ctx, chartConfig);
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id)
      .subscribe(() => {
        console.log('Rendez-vous supprimé avec succès');
        Swal.fire('Success', 'Appointment deleted successfully !', 'success');
        this.loadAppointments();
      }, error => {
        console.error('Erreur lors de la suppression du rendez-vous : ', error);
      });
  }

  editAppointment(id: number): void {
    this.router.navigate(['/admin/update-appointment', id]);
  }
}
