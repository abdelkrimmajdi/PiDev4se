import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';
import { Subscription } from '../models/subscription';

@Component({
  selector: 'app-subscriptionadd',
  templateUrl: './subscriptionadd.component.html',
  styleUrls: ['./subscriptionadd.component.scss']
})
export class SubscriptionaddComponent  implements OnInit {
  
  subscriptionForm: FormGroup = new FormGroup({});

  constructor(
    private subscriptionService: SubscriptionService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      sabName: ['', [Validators.required, Validators.maxLength(15)]],
      descSub: ['', [Validators.required, Validators.maxLength(50)]],
      priceSub: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      startDateSub: [],
      endDateSub: [],
      dureeSub: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      workoutSub: new FormControl(false),  // initialized to false
      mentalSub: new FormControl(false),
      physioSub: new FormControl(false),
      nutriSub: new FormControl(false),
    }, { validators: this.atLeastOneCheckedValidator(['workoutSub', 'mentalSub', 'physioSub', 'nutriSub'])});
  }

  atLeastOneCheckedValidator(controls: string[]) {
    return (formGroup: FormGroup): {[key: string]: any} | null => {
      const isAtLeastOneChecked = controls.some(name => formGroup.get(name)?.value === true);
      return isAtLeastOneChecked ? null : { 'notChecked': true };
    };
  }

  save() {
    // Log form values to console
    console.log('Form values:', this.subscriptionForm.value);
  
    // Check if the form is valid
    if (this.subscriptionForm.valid) {
      const subscriptionData = this.subscriptionForm.value;
      this.subscriptionService.createSubscriptions(subscriptionData).subscribe(
        (createSubscriptions: Subscription) => {
          console.log('Exercise created:', createSubscriptions);
          this.router.navigateByUrl('/admin/sub');
        },
        (error) => { 
          console.error('Error creating exercise:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.subscriptionForm);
    }
  }
  
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    (Object as any).values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  reset(){
    this.subscriptionForm.reset();
  }
  
}

