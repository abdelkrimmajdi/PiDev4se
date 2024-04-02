import { Component, OnInit } from '@angular/core';
import { MentorProgram } from 'src/app/model/MentorProgram';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.scss']
})
export class MentorDetailComponent implements OnInit {
  id!: number ;
  user!: User 
  programs: MentorProgram[] = [];
  

  constructor(
    private mentorProgramService: MentorProgramService,
    private activatedRoute: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.mentorProgramService.getMentorProgramById(this.id).subscribe(
      (data) => {
        // Check if data is an array and contains at least one item
        if (Array.isArray(data) && data.length > 0) {
          this.user = data[0]; // Access the first item in the array
          console.log('Program Details:', this.user);
          // Now fetch mentor exercises for this program
          this.mentorProgramService.getMentorProgramsForUser(this.id).subscribe(
            (p) => {
              this.programs = p;
              console.log('Exercises:', this.programs);
            }
          );
        }
      }
    );
  }
 
    
  }

