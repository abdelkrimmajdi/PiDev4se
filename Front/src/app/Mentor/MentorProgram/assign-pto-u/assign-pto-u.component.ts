import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { User } from 'src/app/model/user.model';
import { MentorProgram } from 'src/app/model/MentorProgram';

@Component({
  selector: 'app-assign-pto-u',
  templateUrl: './assign-pto-u.component.html',
  styleUrls: ['./assign-pto-u.component.scss']
})
export class AssignPtoUComponent implements OnInit {
  id!: number;
  idMentorProg!: number;
  users: User[] = [];
  programs: MentorProgram[] = [];

  constructor(
    private userService: UserService,
    private mentorProgramService: MentorProgramService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchPrograms();
  }

  fetchUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
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

  assignProgramToUser(): void {
    if (!this.id || !this.idMentorProg) {
      console.error('Please select a user and a program.');
      return;
    }

    this.mentorProgramService.assignProgramToUser(this.id, this.idMentorProg).subscribe({
      next: () => {
        console.log('Program assigned to user successfully.');
        // Perform any additional actions after assignment if needed
      },
      error: (error) => {
        console.error('Error assigning program to user:', error);
      }
    });
  }
}
