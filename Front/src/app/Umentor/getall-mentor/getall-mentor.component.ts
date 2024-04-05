import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-getall-mentor',
  templateUrl: './getall-mentor.component.html',
  styleUrls: ['./getall-mentor.component.scss']
})
export class GetallMentorComponent implements OnInit {
  mentorUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllMentorUsers();
  }

  getAllMentorUsers() {
    this.userService.getAllUser().subscribe((res: User[]) => {
      this.mentorUsers = res.filter(user => user.role === 'MENTOR');
    });
  }
}
