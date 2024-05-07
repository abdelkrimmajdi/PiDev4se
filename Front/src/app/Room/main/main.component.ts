import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/model/Room';
import { User } from 'src/app/model/user.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  allUsers: any[] = [];
  currentFirstName: string | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    const userConnectJson = localStorage.getItem('userconnect');
    if (userConnectJson) {
      const userConnect: User  = JSON.parse(userConnectJson);
      this.currentFirstName = userConnect.firstName;
      this.loadAllUsers();
    } else {
      console.error('User not found in localStorage.');
    }
  }

  loadAllUsers(): void {
    this.userService.getAllUser().subscribe(
      (data) => {
        this.allUsers = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  goToChat(username: string): void {
    if (this.currentFirstName) {
      const newRoom: Room = {
        idRoom: 1, // Replace with the actual room ID or generate dynamically
        firstFirstName: this.currentFirstName,
        secondFirstName: username
      };
  
      this.roomService.createChatRoom(newRoom).subscribe(
        (createdRoom) => {
          console.log('Chat room created:', createdRoom);
          sessionStorage.setItem('idRoom', createdRoom.idRoom.toString());
          this.navigateToChat(createdRoom.idRoom);
        },
        (error) => {
          console.error('Error creating chat room:', error);
        }
      );
    } else {
      console.error('Current user first name is undefined.');
    }
  }

  navigateToChat(roomId: number): void {
    sessionStorage.setItem('idRoom', roomId.toString());
    sessionStorage.setItem('gotochat', 'false');
    this.router.navigateByUrl('/chat');
  }

  isCurrentUser(username: string): boolean {
    return username === this.currentFirstName;
  }
}
