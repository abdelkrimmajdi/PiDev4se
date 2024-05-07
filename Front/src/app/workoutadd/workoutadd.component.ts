import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciceService } from '../services/exercice.service';
import { WorkoutService } from '../Services/workout.service';
import { Exercice } from '../models/exercice';
import { WorkoutSession } from '../models/workoutSession';

@Component({
  selector: 'app-workoutadd',
  templateUrl: './workoutadd.component.html',
  styleUrls: ['./workoutadd.component.scss']
})
export class WorkoutaddComponent implements OnInit {

  workoutForm: FormGroup= new FormGroup({});
  exercisesList: Exercice[] = [];

  constructor(
    private exerciceService: ExerciceService,
    private workoutService: WorkoutService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.workoutForm = this.formBuilder.group({
      date: ['', [Validators.required, this.futureDateValidator]], // Added basic required validator as an example
      exercises: this.formBuilder.array([], [this.minSelectedExercisesValidator()]) // Renamed to match the HTML
    });
    this.loadExercises();
  }
  
  futureDateValidator(control: FormControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    if (inputDate < currentDate) {
      return { 'futureDate': true }; // Validation error key
    }
    return null; // Validation passed
  }

  minSelectedExercisesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control instanceof FormArray)) {
        return null; // Not a FormArray, so no validation error
      }
      
      const checked = (control as FormArray).controls.some((item) => item.value);
      return checked ? null : { 'minSelectedExercises': true }; // Validation error key
    };
  }

  loadExercises(): void {
    // Assuming you have a service method to get exercises
    this.exerciceService.getAllExercices().subscribe((exercises: Exercice[]) => {
      this.exercisesList = exercises;
      this.addCheckboxes();
    });
  }

  private addCheckboxes() {
    this.exercisesList.forEach(() => this.exercises.push(this.formBuilder.control(false)));
  }
  
  get exercises() {
    return this.workoutForm.get('exercises') as FormArray;
  }  

  save(): void {
    if (this.workoutForm.valid) {
      const selectedExercises = this.exercises.value
      .map((checked: boolean, index: number) => checked ? this.exercisesList[index].idExer : null)
      .filter((id: number | null) => id !== null);

      const workoutSession: WorkoutSession = {
        idWork: 0,
        date: this.workoutForm.value.date,
        duration: 0,
        exercises: [] // Empty for now, will be populated after workout creation
      };

      this.workoutService.createWorkout(workoutSession).subscribe((createdWorkout: WorkoutSession) => {
        // Update the workoutSession object with createdWorkout ID and then add exercises
        workoutSession.idWork = createdWorkout.idWork;

        // Now add exercises to the workout session
        this.workoutService.addExercisesToSession(workoutSession.idWork, new Set(selectedExercises)).subscribe(() => {
          this.router.navigateByUrl('/admin/workout');
        });
      });
      
    } else {
      this.markFormGroupTouched(this.workoutForm);
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

  reset(): void {
    this.workoutForm.reset();
  }

}