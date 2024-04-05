import { Component, OnInit } from '@angular/core';
import { WorkoutSession } from '../models/workoutSession';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../services/workout.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Exercice } from '../models/exercice';
import { ExerciceService } from '../services/exercice.service';

@Component({
  selector: 'app-workoutdetail',
  templateUrl: './workoutdetail.component.html',
  styleUrls: ['./workoutdetail.component.scss']
})
export class WorkoutdetailComponent implements OnInit {
  idWork!: number;
  workoutForm: FormGroup;
  exercisesList: Exercice[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private exerciceService: ExerciceService,
    private formBuilder: FormBuilder
  ) {
    this.workoutForm = this.formBuilder.group({
      date: ['', [Validators.required, this.futureDateValidator]], // Add future date validator
      exercises: this.formBuilder.array([], [this.minSelectedExercisesValidator()]) // Add min selected exercises validator
    });
  }

  ngOnInit(): void {
    this.idWork = this.route.snapshot.params['idWork'];
    this.loadWorkout();
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
  
  loadWorkout(): void {
    this.workoutService.getWorkoutById(this.idWork).subscribe(
      (data: WorkoutSession) => {
        this.workoutForm.patchValue({
          date: new Date(data.date).toISOString().substring(0, 10)
        });
  
        if (data.exercises && data.exercises.length > 0) {
          const selectedExercisesIds = data.exercises.map(exercise => exercise.idExer);
  
          this.exercisesList.forEach((exercise, index) => {
            const isChecked = selectedExercisesIds.includes(exercise.idExer);
            console.log(`Exercise ${exercise.idExer} - isChecked: ${isChecked}`);
            this.exercises.controls[index].setValue(isChecked);
          });
          console.log('FormArray Controls:', this.exercises.controls); // Log controls for inspection
        }
      },
      (error) => {
        console.error('Error loading workout:', error);
      }
    );
  }
  
  

  loadExercises(): void {
    this.exerciceService.getAllExercices().subscribe((exercises: Exercice[]) => {
      this.exercisesList = exercises;
      this.addCheckboxes();
    });
  }

  private addCheckboxes() {
    this.exercisesList.forEach(() => this.exercises.push(this.formBuilder.control(false)));
  }

  get exercises() {
    return (this.workoutForm.get('exercises') as FormArray);
  }

  save(): void {
    if (this.workoutForm.valid) {
      const selectedExercises = this.exercises.controls
        .map((control, index) => ({ checked: control.value, exercise: this.exercisesList[index] }))
        .filter(item => item.checked)
        .map(item => item.exercise.idExer); // Get only exercise IDs
  
      const updatedWorkout: WorkoutSession = {
        idWork: this.idWork,
        date: this.workoutForm.value.date,
        duration: 0, // Adjust as needed
        exercises: [] // Leave empty as we will add exercises after updating
      };
  
      this.workoutService.updateWorkout(updatedWorkout, this.idWork).subscribe(
        () => {
          // Now add the selected exercises to the updated workout session
          this.workoutService.addExercisesToSession(this.idWork, new Set(selectedExercises)).subscribe(
            () => {
              this.router.navigateByUrl('/admin/workout');
            },
            (error) => {
              console.error('Error adding exercises to workout:', error);
            }
          );
        },
        (error) => {
          console.error('Error updating workout:', error);
        }
      );
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