import { Component, OnInit } from '@angular/core';
import { MentorProgram } from 'src/app/model/MentorProgram';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-getallprogram',
  templateUrl: './getallprogram.component.html',
  styleUrls: ['./getallprogram.component.scss']
})
export class GetallprogramComponent implements OnInit {
  mentorPrograms: MentorProgram[] = [];
  id!: number;

  constructor(private mentorProgramService: MentorProgramService,) { }

  ngOnInit(): void {
    const userConnectJson = localStorage.getItem('userconnect');
    if (userConnectJson) {
      const userConnect: User = JSON.parse(userConnectJson);
      this.id = userConnect.id;
      this.loadMentorProgramsForCurrentUser(userConnect.id);
    } else {
      console.error('User not found in localStorage.');
    }
  }

  loadMentorProgramsForCurrentUser(userId: number): void {
    this.mentorProgramService.getMentorProgramsForUser(userId)
      .subscribe(
        mentorPrograms => {
          this.mentorPrograms = mentorPrograms;
        },
        error => {
          console.error('Error fetching mentor programs:', error);
        }
      );
  }
}
