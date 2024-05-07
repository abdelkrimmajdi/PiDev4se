import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { Router } from '@angular/router';
import { Delivery } from '../model/Delivery';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  deliveryservice: any;

  deliveries: Delivery[] = [];
  checkForm() {
    throw new Error('Method not implemented.');
  }

  userForm!: FormGroup; 

  constructor(private fb: FormBuilder, private deliveryService: DeliveryService, private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      adresse: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let deliv =  this.userForm.value as Delivery
    deliv.total =   parseInt(localStorage.getItem('total') || '0') ;

    this.deliveryService.saveDelivery(deliv).subscribe(
      (response: Delivery) => {
        console.log(response);
        this.router.navigateByUrl('/payment');
      },
      error => {
        console.error('Error occurred while saving delivery:', error);
        // Handle error if needed
      }
    );
  }

  loadDeliveries() {
    this.deliveryService.getAllDeliveries().subscribe(
      (deliveries: Delivery[]) => {
        this.deliveries = deliveries;
      },
      error => {
        console.error('Error occurred while fetching deliveries:', error);
        // Gérer les erreurs si nécessaire
      }
    );
  }



}

