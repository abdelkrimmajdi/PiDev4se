import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';
import { StripeComponent } from '../stripe/stripe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.scss']
})
export class ShowProgramComponent {
  listProgram: NutrionnistProgram[] = []; 
  stripeComponent!: StripeComponent;

  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  programss: NutrionnistProgram[] = [];
  constructor(private ServiceNut: NutritionnistService, private selectedProgramService: SelectProgramService, private fb: FormBuilder, private router: Router, private ac: ActivatedRoute,private http: HttpClient){
    this.stripeComponent = new StripeComponent(http, ac, router); // Create an instance of StripeComponent with dependencies
  }

  subForm!: FormGroup;
  securityCodeVisible = false;
  

  ngOnInit(): void {
    this.loadPrograms();  
    this.initializeForm();
  }
  loadPrograms() {
    const userId = this.selectedProgramService.IdUser;
    if (userId) {
      this.ServiceNut.getNutrisionistProgramsByUserId(userId).subscribe(
        (data: NutrionnistProgram[]) => {
          this.listProgram = data;
     
        },
        error => {
          console.log('Error fetching programs:', error);
        }
      );
    }
  }
  selectProgram(programId: number) {
    this.selectedProgramService.selectedProgramId = programId;
    console.log('Selected program ID:', programId);
  }
  affectNutritionistProgramsToUser(): void {
    const programId = this.selectedProgramService.selectedProgramId;
    if (!programId) {
      console.error('Aucun programme sélectionné !');
      return;
    }
    this.ServiceNut.affectNutritionistProgramsToUser(this.userconnect.id, programId).subscribe(
      () => {
        console.log('Programme nutritionnel affecté à l\'utilisateur avec succès !');
       
      },
      (error) => {
        console.error('Erreur lors de l\'affectation du programme nutritionnel à l\'utilisateur : ', error);

      }
    );
  }


  

  
  paySubscription(): void {
    // Votre logique de paiement ici
  
    // Créez une promesse pour gérer le processus de paiement
    const paymentPromise = new Promise<boolean>((resolve) => {
      // Appelez la méthode de paiement et résolvez la promesse avec le résultat du paiement
      // Ici, vous pouvez placer votre logique de paiement, par exemple, l'appel à Stripe ou à une autre passerelle de paiement.
      // Supposons que le paiement soit réussi pour l'exemple
      const paymentSuccessful = true;
      resolve(paymentSuccessful);
    });
  
    // Après que le paiement soit résolu (en supposant que c'est toujours réussi)
    paymentPromise.then((paymentSuccessful: boolean) => {
      if (paymentSuccessful) {
      console.log('Payment successful.');
        this.affectNutritionistProgramsToUser();
      } else {
        console.log('Payment failed.');
      }
    });
  }
  selectedsub!: NutrionnistProgram;
  initializeForm(): void {
    // Initialisation du formulaire avec FormBuilder
    this.subForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19), this.validateCardNumber]],
      expirationDate: ['', [Validators.required, this.validateExpirationDate]],
      securityCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]{4}$')]]
    });
  }
  formatCardNumber(event: any): void {
    // Get the current value of the card number input
    let cardNumber = event.target.value;
  
    // Remove any non-digit characters from the input
    cardNumber = cardNumber.replace(/\D/g, '');
  
    // Add a space after every 4 digits using regex
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  
    // Update the form control with the formatted card number
    this.subForm.patchValue({ cardNumber });
  }
  validateCardNumber(control: any): { [key: string]: any } | null {
    const cardNumber = control.value;
    if (cardNumber && cardNumber.replace(/\D/g, '').length !== 16) {
      return { 'invalidLength': true };
    }
    return null;
  }
  isInvalidControl(controlName: string): boolean {
    const control = this.subForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  
  validateExpirationDate(control: any) {
    const expirationDate = control.value;
    if (!expirationDate || expirationDate.length !== 7 || expirationDate.indexOf('/') === -1) {
      return { 'invalidExpirationDate': true };
    }
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (isNaN(Number(month)) || isNaN(Number(year)) || Number(month) < 1 || Number(month) > 12 || Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
      return { 'invalidExpirationDate': true };
    }
    return null;
  }
  
  openPaymentModal(subscription: NutrionnistProgram): void {
    this.selectedsub = subscription;
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.style.display = 'block';
    
    }
  }
  closePaymentModal(): void {
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  toggleSecurityVisibility(): void {
    this.securityCodeVisible = !this.securityCodeVisible;
  }
  
}



