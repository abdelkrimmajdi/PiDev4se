import { Component, OnInit } from '@angular/core';
import { Exercice } from '../models/exercice';
import { ExerciceService } from '../Services/exercice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit{
  
  exercices: Exercice[] = [];
  exerciceForm: FormGroup= new FormGroup({});
  Intensity: string[]=['Low','Moderate','Hard'];

  constructor(private exerciceService: ExerciceService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadExercices();
    this.exerciceForm= this.formBuilder.group({
      nameExer: ['', Validators.required],
      descriptionExe: ['', Validators.required],
      durationExer: ['', Validators.required],
      intensity: ['', Validators.required],
      muscle: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  loadExercices(): void {
    this.exerciceService.getAllExercices().subscribe(exercices => {
      this.exercices = exercices;
    })
  }

}
