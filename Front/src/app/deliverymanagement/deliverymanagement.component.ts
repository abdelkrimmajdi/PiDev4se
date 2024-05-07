import { Component } from '@angular/core';
import { Delivery } from '../model/Delivery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-deliverymanagement',
  templateUrl: './deliverymanagement.component.html',
  styleUrls: ['./deliverymanagement.component.scss']
})
export class DeliverymanagementComponent {
  deliveries: Delivery[] = [];
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

    this.loadDeliveries(); 
    
  }



  deleteDelivery(idDelivery: number): void {
    this.deliveryService.deleteDelivery(idDelivery).subscribe(
      () => {
        console.log(`Delivery with ID ${idDelivery} deleted successfully.`);
        this.loadDeliveries();
        
      },
      (error) => {
        console.error('Error deleting delivery:', error);
        
      }
    );
  }

  
  onSubmit() {
    let deliv =  this.userForm.value as Delivery
    deliv.total =   parseInt(localStorage.getItem('total') || '0') ;
    
    console.log(this.userForm.value as Delivery);
    this.deliveryService.saveDelivery(this.userForm.value as Delivery).subscribe(
      (response: Delivery) => {
        console.log(response);
        this.router.navigateByUrl('/payment');
        this.loadDeliveries(); // Charger les nouvelles livraisons après en avoir ajouté une
      },
      error => {
        console.error('Error occurred while saving delivery:', error);
        // Gérer les erreurs si nécessaire
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
  filteredDelivery: Delivery[] = [];
  error: string | null = null;
  searchTerm: string = '';
  searchProduct(): void {
    const id = Number(this.searchTerm);
    if (!isNaN(id) && id !== 0) {
      this.deliveryService.getDeliveryById(id).subscribe({
        next: (product) => {
          this.filteredDelivery = [product]; // Display only the searched product
          this.error = null;
        },
        error: () => {
          this.error = 'delivery not found';
          this.filteredDelivery = [];
        }
      });
    } else {
      this.error = 'Please enter a valid product ID';
      this.filteredDelivery = [];
    }
  }

  


}
