import { Component } from '@angular/core';
import { Subscription } from '../models/subscription';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscriptiondetail',
  templateUrl: './subscriptiondetail.component.html',
  styleUrls: ['./subscriptiondetail.component.scss']
})
export class SubscriptiondetailComponent {
  idSub!:number
  s!:Subscription

  constructor(
    private formBuilder: FormBuilder,
    private Act:ActivatedRoute,
    private subscriptionService:SubscriptionService,
    private router:Router
  ){}

  subscriptionForm:FormGroup=new FormGroup({});
  
  ngOnInit(){
    //1- recuperer l'id depuis l'url
    this.idSub=this.Act.snapshot.params['idSub']
    //2- recuperer le produit de l'id deja recuperer
    this.subscriptionService.getSubscriptionsById(this.idSub).subscribe(
      (data)=>{this.s=data
        //3- remplir formulaire avec p
        this.subscriptionForm.patchValue(this.s as any)
      }
    )

    this.subscriptionForm = this.formBuilder.group({
      sabName: ['', [Validators.required, Validators.maxLength(100)]],
      descSub: ['', [Validators.required, Validators.maxLength(500)]],
      priceSub: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      startDateSub: [],
      endDateSub: [],
      dureeSub: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
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

  save(){
    if (this.subscriptionForm.valid) {
      this.subscriptionService.updateSubscriptions(this.subscriptionForm.value as any, this.idSub).subscribe(
        ()=>this.router.navigateByUrl('/admin/sub')
      )
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
    this.subscriptionForm.reset()
  }
}

