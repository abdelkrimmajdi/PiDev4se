import { Component, OnInit } from '@angular/core';
import { MentorExerciceService } from 'src/app/services/mentor-exercice.service';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { MentorExercice } from 'src/app/model/MentorExercice';
import { MentorProgram } from 'src/app/model/MentorProgram';

@Component({
  selector: 'app-assign-eto-p',
  templateUrl: './assign-eto-p.component.html',
  styleUrls: ['./assign-eto-p.component.scss']
})
export class AssignEtoPComponent implements OnInit {
  name: string = '';
  idExercice!: number;
  exercises: MentorExercice[] = [];
  programs: MentorProgram[] = []; // Array to hold fetched programs

  constructor(
    private mentorExerciceService: MentorExerciceService,
    private mentorProgramService: MentorProgramService
  ) {}

  ngOnInit(): void {
    this.fetchExercises();
    this.fetchPrograms();
  }

  fetchExercises(): void {
    this.mentorExerciceService.getAllMentorExercices().subscribe({
      next: (data: MentorExercice[]) => {
        this.exercises = data;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
      }
    });
  }

  fetchPrograms(): void {
    this.mentorProgramService.getAllMentorPrograms().subscribe({
      next: (data: MentorProgram[]) => {
        this.programs = data;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      }
    });
  }

  assignExerciceToProgramUsingName(): void {
    if (!this.idExercice) {
      console.error('Please select an exercise.');
      return;
    }

    const selectedProgram = this.programs.find(program => program.name === this.name);
    if (!selectedProgram) {
      console.error('Program not found.');
      return;
    }

    const programId = selectedProgram.idMentorProg;
    
    this.mentorExerciceService.assignExerciceToProgram(this.idExercice, programId).subscribe({
      next: () => {
        console.log('Exercise assigned to program successfully.');
      },
      error: (error) => {
        console.error('Error assigning exercise to program:', error);
      }
    });
  }
}
