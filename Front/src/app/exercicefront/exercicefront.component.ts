import { Component, OnInit } from '@angular/core';
import { Exercice } from '../models/exercice';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExerciceService } from '../services/exercice.service';

@Component({
  selector: 'app-exercicefront',
  templateUrl: './exercicefront.component.html',
  styleUrls: ['./exercicefront.component.scss']
})
export class ExercicefrontComponent implements OnInit {
  selectedExercise: any;
  exercises: Exercice[] = [];
  filteredExercises: Exercice[] = [];
  selectedMuscle: string = '';

  constructor(private exerciceService: ExerciceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises() {
    this.exerciceService.getAllExercices().subscribe(
      (exercises: Exercice[]) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }
  //npm install @angular/material @angular/cdk

  onHover(event: MouseEvent) {
    const target = event.target as SVGElement;
    target.setAttribute('fill', 'rgba(255, 0, 0, 0.5)');
    // Show tooltip using Angular Material matTooltip
    target.dispatchEvent(new Event('mouseenter'));
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as SVGElement;
    target.setAttribute('fill', 'transparent');
    // Hide tooltip using Angular Material matTooltip
    target.dispatchEvent(new Event('mouseleave'));
  }

  filterExercisesByMuscle(muscle: string) {
    this.selectedMuscle = muscle;
    const selectedMuscleLower = muscle.toLowerCase(); // Convert to lowercase
    this.filteredExercises = this.exercises.filter(exercise => 
      exercise.muscle.toLowerCase().includes(selectedMuscleLower)
    );
  }

  // Reset filtered exercises when no muscle is selected
  resetFilter() {
    this.selectedMuscle = '';
    this.filteredExercises = [];
  }

  showExerciseDetails(exercise: any) {
    this.selectedExercise = exercise;
  }

  getSafeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedExercise.videoExer);
  }

}
