import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { MentorProgram } from 'src/app/model/MentorProgram';
import { MentorExercice } from 'src/app/model/MentorExercice';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-detail-prog',
  templateUrl: './detail-prog.component.html',
  styleUrls: ['./detail-prog.component.scss']
})
export class DetailProgComponent implements OnInit {
  idMentorProg!: number;
  m!: MentorProgram;
  exercises: MentorExercice[] = [];
  constructor(
    private mentorProgramService: MentorProgramService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idMentorProg = this.activatedRoute.snapshot.params['idMentorProg'];
    this.mentorProgramService.getMentorProgramById(this.idMentorProg).subscribe(
      (data) => {
        // Check if data is an array and contains at least one item
        if (Array.isArray(data) && data.length > 0) {
          this.m = data[0]; // Access the first item in the array
          console.log('Program Details:', this.m);
          // Now fetch mentor exercises for this program
          this.mentorProgramService.getMentorExercisesForProgram(this.idMentorProg).subscribe(
            (exercises) => {
              this.exercises = exercises;
              console.log('Exercises:', this.exercises);
            }
          );
        }
      }
    );
  }
    
  

  
  

  generatePDFForMentorProgramDetails(): void {
    const doc = new jsPDF();
    doc.text(`Mentor Program Details`, 10, 10);
    doc.text(`ID: ${this.m.idMentorProg}`, 10, 20);
    doc.text(`Name: ${this.m.name}`, 10, 30);
    doc.text(`Description: ${this.m.description}`, 10, 40);
    doc.text(`Type: ${this.m.type}`, 10, 50);
    doc.text(`Objective: ${this.m.objectf}`, 10, 60);
    doc.text(`Duration: ${this.m.duration}`, 10, 70);
    
    // Add exercises
    let exerciseText = `Mentor Exercises:`;
    this.exercises.forEach((exercise, index) => {
      exerciseText += `\n${index + 1}. ${exercise.name}`;
    });
    doc.text(exerciseText, 10, 80);

    doc.save('MentorProgramDetails.pdf');
  }
}
