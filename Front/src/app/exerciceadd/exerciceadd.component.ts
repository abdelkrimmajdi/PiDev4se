import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ExerciceService } from '../services/exercice.service';
import { Exercice } from '../models/exercice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exerciceadd',
  templateUrl: './exerciceadd.component.html',
  styleUrls: ['./exerciceadd.component.scss']
})
export class ExerciceaddComponent implements OnInit{
  
  exerciceForm: FormGroup = new FormGroup({});
  Intensitys: string[]=['Low','Moderate','Hard'];
  selectedFile: File | null = null;
  pictureRoot: string | null = null;

  muscleOptions: string[] = ['Chest', 'Traps', 'Shoulders', 'Biceps', 'Forearms', 'Obliques', 'Abdominals', 'Quads'];
  selectedMuscles: string[] = [];

  constructor(
    private exerciceService: ExerciceService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.exerciceForm = this.formBuilder.group({
      nameExer: ['', [Validators.required, Validators.maxLength(100)]],
      descriptionExe: ['', [Validators.required, Validators.maxLength(500)]],
      durationExer: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      intensity: ['', Validators.required],
      muscle: [],
      picture: ['', [Validators.required, Validators.pattern(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)]]
    });
  }

  minSelectedMusclesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control instanceof FormArray)) {
        return null; // Not a FormArray, so no validation error
      }
      
      const checked = (control as FormArray).controls.some((item) => item.value);
      return checked ? null : { 'minSelectedExercises': true }; // Validation error key
    };
  }

  save(){
    if (this.exerciceForm.valid) {
      const muscleValue = this.selectedMuscles.join(', ');
      this.exerciceForm.get('muscle')?.setValue(muscleValue);
      
      const Exercice = this.exerciceForm.value;
      this.exerciceService.createExercice(Exercice).subscribe(
        ()=>{this.router.navigateByUrl('/admin/exercice')},
      );
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

  updateSelectedMuscles(event: any, muscle: string): void {
    if (event.target.checked) {
      this.selectedMuscles.push(muscle);
    } else {
      const index = this.selectedMuscles.indexOf(muscle);
      if (index !== -1) {
        this.selectedMuscles.splice(index, 1);
      }
    }
  }
  
  reset(){
    this.exerciceForm.reset();
    this.selectedFile = null;
    this.pictureRoot = null;
    this.selectedMuscles = [];
  }

}
