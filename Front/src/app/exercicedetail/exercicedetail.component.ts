import { Component } from '@angular/core';
import { Exercice } from '../models/exercice';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../services/exercice.service';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exercicedetail',
  templateUrl: './exercicedetail.component.html',
  styleUrls: ['./exercicedetail.component.scss']
})
export class ExercicedetailComponent {
  idExer!:number
  e!:Exercice
  Intensitys: string[]=['Low','Moderate','Hard'];

  constructor(private formBuilder: FormBuilder,private Act:ActivatedRoute, private exerciceService:ExerciceService, private router:Router){}

  exerciceForm:FormGroup=new FormGroup({});
  
  ngOnInit(){
    //1- recuperer l'id depuis l'url
    this.idExer=this.Act.snapshot.params['idExer']
    //2- recuperer le produit de l'id deja recuperer
    this.exerciceService.getExerciceById(this.idExer).subscribe(
      (data)=>{this.e=data
        //3- remplir formulaire avec p
        this.exerciceForm.patchValue(this.e as any)
      }
    )

    this.exerciceForm = this.formBuilder.group({
      nameExer: ['', [Validators.required, Validators.maxLength(100)]],
      descriptionExe: ['', [Validators.required, Validators.maxLength(500)]],
      durationExer: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      intensity: ['', Validators.required],
      muscle: ['', [Validators.required, Validators.maxLength(100)]],
      picture: ['', [Validators.required, Validators.pattern(/\.(jpeg|jpg|gif|png)$/i)]]
    });
  }

  save(){
    if (this.exerciceForm.valid) {
      this.exerciceService.updateExercice(this.exerciceForm.value as any, this.idExer).subscribe(
        ()=>this.router.navigateByUrl('/admin/exercice')
      )
    } else {
      this.markFormGroupTouched(this.exerciceForm);
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
    this.exerciceForm.reset()
  }
}
