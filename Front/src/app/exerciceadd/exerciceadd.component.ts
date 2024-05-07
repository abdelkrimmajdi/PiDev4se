import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Exercice } from '../models/exercice';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ExerciceService } from '../services/exercice.service';

@Component({
  selector: 'app-exerciceadd',
  templateUrl: './exerciceadd.component.html',
  styleUrls: ['./exerciceadd.component.scss']
})
export class ExerciceaddComponent implements OnInit {

  exerciceForm: FormGroup = new FormGroup({});
  Intensitys: string[] = ['Low', 'Moderate', 'Hard'];
  selectedFile: File | null = null;

  muscleOptions: string[] = ['Chest', 'Traps', 'Shoulders', 'Biceps', 'Forearms', 'Obliques', 'Abdominals', 'Quads'];
  selectedMuscles: string[] = [];

  youtubeVideoID: string | null = null;

  constructor(
    private exerciceService: ExerciceService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.exerciceForm = this.formBuilder.group({
      nameExer: ['', [Validators.required, Validators.maxLength(100)]],
      descriptionExe: ['', [Validators.required, Validators.maxLength(500)]],
      durationExer: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      intensity: ['', Validators.required],
      muscle: [],
      picture: ['', [Validators.required, Validators.pattern(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)]],
      videoExer: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)]]
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

  save() {
    // Log form values to console
    console.log('Form values:', this.exerciceForm.value);

    // Check if the form is valid
    if (this.exerciceForm.valid) {
      this.youtubeVideoID = this.convertToEmbedUrl(this.exerciceForm.get('videoExer')!.value);
      const muscleValue = this.selectedMuscles.join(', ');
      this.exerciceForm.get('muscle')?.setValue(muscleValue);
      // Create exercise without the image
      const exerciseData = {
        ...this.exerciceForm.value,
        videoExer: this.youtubeVideoID
      };
      this.exerciceService.createExercice(exerciseData).subscribe(
        (createdExercise: Exercice) => {
          console.log('Exercise created:', createdExercise);

          // Check if there is a selected file
          if (this.selectedFile) {
            // Upload image for the exercise
            this.exerciceService.uploadImage(this.selectedFile, createdExercise.idExer).subscribe(
              (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                  const imagePath = event.body;

                  // Check if this.selectedFile is not null before accessing its properties
                  if (this.selectedFile) {
                    // Update the exercise with the image filename directly
                    createdExercise.picture = this.selectedFile.name; // Set only the filename
                  }

                  // Proceed with updating the exercise
                  this.exerciceService.updateExercice(createdExercise, createdExercise.idExer).subscribe(
                    () => {
                      console.log('Exercise updated with image successfully.');
                      this.router.navigateByUrl('/admin/exercice');
                    },
                    (error) => {
                      console.error('Error updating exercise with image:', error);
                      // You might want to handle this error scenario
                    }
                  );
                }
              },
              (error) => {
                console.error('Error uploading image:', error);
                // You might want to handle this error scenario
              },
              () => {
                this.router.navigateByUrl('/admin/exercice');
              }
            );
          } else {
            // No image selected, navigate to exercise list page
            this.router.navigateByUrl('/admin/exercice');
          }

        },
        (error) => {
          console.error('Error creating exercise:', error);
          // You might want to handle this error scenario
        }
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

  reset() {
    this.exerciceForm.reset();
    this.selectedFile = null;
    this.selectedMuscles = [];
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      console.log('Selected file:', fileName); // Check if the file is properly set

      // Set the filename as the value of the 'picture' form control
      this.exerciceForm.get('picture')?.setValue(fileName);

      // Store the selected file for upload
      this.selectedFile = files[0];
    }
  }

  convertToEmbedUrl(url: string): string | null {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        return null; // Invalid YouTube URL
    }
  }

}
