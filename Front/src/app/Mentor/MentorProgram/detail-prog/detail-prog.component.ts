import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { MentorProgram } from 'src/app/model/MentorProgram';
import { MentorExercice } from 'src/app/model/MentorExercice'; // Assuming you have an Exercise model

@Component({
  selector: 'app-detail-prog',
  templateUrl: './detail-prog.component.html',
  styleUrls: ['./detail-prog.component.scss']
})
export class DetailProgComponent implements OnInit {
  idMentorProg!: number;
  m!: MentorProgram;
  exercises: MentorExercice[] = []; // Array to store mentor exercises

  constructor(
    private mentorProgramService: MentorProgramService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.idMentorProg = +this.activatedRoute.snapshot.params['idMentorProg']; // Convert to number
      console.log('Program ID:', this.idMentorProg);
    
      // Fetch mentor program details
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
    
}
