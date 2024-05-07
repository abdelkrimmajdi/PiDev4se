import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MentorExercice } from 'src/app/model/MentorExercice';
import { MentorExerciceService } from 'src/app/services/mentor-exercice.service';

@Component({
  selector: 'app-mentor-exercice',
  templateUrl: './mentor-exercice.component.html', 
  styleUrls: ['./mentor-exercice.component.scss']
})
export class MentorExerciceComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<MentorExercice>; // Initialize with definite assignment assertion
  displayedColumns: string[] = [ 'name', 'description', 'priority', 'exeTime', 'picture', 'actions'];
  searchCriteria: string = ''; // Change searchCriteria to string type

  constructor(private mentorExerciceService: MentorExerciceService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MentorExercice>([]); // Specify MentorExercice type
    this.dataSource.sort = this.sort;
    this.searchExercices();
  }

  searchExercices(): void {
    if (this.searchCriteria.trim()) {
      this.mentorExerciceService.searchExercisesByName(this.searchCriteria).subscribe({
        next: (data: any) => { // Change the type to 'any'
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      });
    } else {
      // If search criteria is empty, fetch all exercises
      this.mentorExerciceService.getAllMentorExercices().subscribe({
        next: (data: any) => { // Change the type to 'any'
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      });
    }
  }

  supp(IdExercice: number): void {
    this.mentorExerciceService.deleteMentorExercice(IdExercice).subscribe(
      () => {
        // Remove the deleted item from the list
        this.dataSource.data = this.dataSource.data.filter(exercise => exercise.idExercice !== IdExercice);
      },
      (error) => console.error(error)
    );
  }
}
