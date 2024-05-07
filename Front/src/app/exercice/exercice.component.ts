import { Component, OnInit } from '@angular/core';
import { Exercice } from '../models/exercice';
import { FormBuilder } from '@angular/forms';
import { ExerciceService } from '../services/exercice.service';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit {
  
  exercices: Exercice[] = [];
  filteredExercises: Exercice[] = [];
  search!: string;

  constructor(private exerciceService: ExerciceService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadExercices();
  }

  loadExercices(): void {
    this.exerciceService.getAllExercices().subscribe(exercices => {
      this.exercices = exercices;
      // Initialize filteredExercises after exercices have been populated
      this.filteredExercises = this.exercices;
    })
  }

  deleteExercice(id: number) {
    this.exerciceService.deleteExercice(id).subscribe(
      () => this.ngOnInit()
    )
  }

  searchExercices() {
    if (!this.search) {
      this.filteredExercises = this.exercices;
    } else {
      const searchTermLower = this.search.toLowerCase();
      this.filteredExercises = this.exercices.filter(e =>
        Object.values(e).some(val =>
          (typeof val === 'string' || typeof val === 'number') &&
          val.toString().toLowerCase().includes(searchTermLower)
        )
      );
    }
  }

  sortColumn: keyof Exercice | null = null; // Initialize to an empty string
  sortDirection: 'asc' | 'desc' = 'asc'; // Initialize to ascending by default

  sort(property: keyof Exercice): void {
    if (property === this.sortColumn) {
      // If the same column is clicked again, toggle the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, reset the sorting direction to ascending
      this.sortDirection = 'asc';
    }

    // Update the sortColumn to the clicked column
    this.sortColumn = property;

    this.filteredExercises.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      } else {
        return 0; // No sorting for other types
      }
    });
  }

  getImageUrl(fileName: string): string {
    // Assuming 'fileName' contains the file path returned by the backend
    return `file://${fileName}`;
  }
  
}
