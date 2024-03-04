import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciceService } from '../Services/exercice.service';
import { Exercice } from '../models/exercice';

@Component({
  selector: 'app-exerciceadd',
  templateUrl: './exerciceadd.component.html',
  styleUrls: ['./exerciceadd.component.scss']
})
export class ExerciceaddComponent implements OnInit{
  
  exerciceForm: FormGroup = new FormGroup({});
  Intensitys: string[]=['Low','Moderate','Hard'];

  constructor(private exerciceService: ExerciceService, private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.exerciceForm= this.formBuilder.group({
      nameExer: ['', Validators.required],
      descriptionExe: ['', Validators.required],
      durationExer: ['', Validators.required],
      intensity: ['', Validators.required],
      muscle: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

}
