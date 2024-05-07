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
  id!: number;
  user!: User;
  programs: MentorProgram[] = [];
  loading = true;
  error = '';

  constructor(
    private mentorProgramService: MentorProgramService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService // Assuming you need this service
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id']; // Convert id to number
    console.log(this.id);
    this.userService.getOneUser(this.id).subscribe(
      (userData: User) => {
        this.user = userData;
        this.loadMentorProgramsForUser(this.id);
      },
      (error) => {
        this.error = 'Failed to fetch user details';
        this.loading = false;
      }
    );
  }

  loadMentorProgramsForUser(userId: number): void {
    this.mentorProgramService.getMentorProgramsForUser(userId)
      .subscribe(
        mentorPrograms => {
          this.programs = mentorPrograms;
        },
        error => {
          console.error('Error fetching mentor programs:', error);
        }
      );
  }
}
