import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Message } from 'src/app/model/Message';
import { Room } from 'src/app/model/Room';
import { User } from 'src/app/model/user.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  chatForm!: FormGroup;
  chatObj: Room = new Room();
  messageObj: Message = new Message();
  messageList: Message[] = [];
  chatList: Room[] = [];
  replymessage: string = '';
  chatData: Room | null = null;
  idRoom: number | null = parseInt(sessionStorage.getItem('idRoom') || '', 10);
  secondFirstName: string = '';
  alluser: User[] = [];
  check: string | null = sessionStorage.getItem('firstName');
  timesRun = 0;
  timesRun2 = 0;
  firstFirstName: string | null = sessionStorage.getItem('firstName');
  senderEmail: string | null = sessionStorage.getItem('firstName');
  senderCheck: string | null = sessionStorage.getItem('firstName');
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(
    private chatService: RoomService,
    private router: Router,
    private userService: UserService,
    private cdref: ChangeDetectorRef
  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.fetchChatData();
    this.fetchUserList();
  }
  

  fetchChatData(): void {
    setInterval(() => {
      if (this.idRoom !== null) {
        this.chatService.getChatById(this.idRoom).subscribe(data => {
          this.chatData = data;
          this.secondFirstName = this.chatData.secondFirstName;
          this.firstFirstName = this.chatData.firstFirstName;

          if (typeof this.idRoom === 'number') {
            this.fetchMessagesByChatId(this.idRoom); 
          }
  
          this.chatList = [this.chatData]; 
        });
      }
    }, 1000);
  }
  
  fetchMessagesByChatId(roomId: number): void {
    // Ensure roomId is a valid number before making the API call
  
      this.chatService.getAllMessagesByChatId(roomId).subscribe(messages => {
        this.messageList = messages;
        
        console.log(messages)
    
  })
  }

  fetchUserList(): void {
    let getAllUsersInterval = setInterval(() => {
      this.userService.getAllUser().subscribe(
        (users: User[]) => {
          this.alluser = users;
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );

      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(getAllUsersInterval);
      }
    }, 1000);
  }

  loadChatByEmail(secondUserFirstName: string, firstUserFirstName: string): void {
    const userConnectJson = localStorage.getItem('user');
  
    if (!userConnectJson) {
      console.error('User data not found in localStorage.');
      return;
    }
  
    const userConnect = JSON.parse(userConnectJson);
    const loggedInUserFirstName = userConnect.firstName;
  
    this.chatService.getChatByFirstUserNameOrSecondUserName(loggedInUserFirstName).subscribe(data => {
      if (data.length > 0) {
        this.idRoom = data[0].idRoom;
        sessionStorage.setItem('idRoom', this.idRoom.toString());
      } else {
        this.chatObj.firstFirstName = loggedInUserFirstName;
        this.chatObj.secondFirstName = secondUserFirstName;
        
        this.chatService.createChatRoom(this.chatObj).subscribe(
          (chatData: Room) => {
            this.idRoom = chatData.idRoom;
            sessionStorage.setItem('idRoom', this.idRoom.toString());
          },
          (error: any) => {
            console.error('Error creating chat room:', error);
          }
        );
      }
    }, error => {
      console.error('Error fetching chat data:', error);
    });
  }

  sendMessage(): void {
  
    if (this.userconnect.email&& this.idRoom !== null) {
      if (this.chatForm) {
        // Utiliser chatForm en toute sécurité ici
        const replyMessageValue = this.chatForm.get('replymessage')?.value;
        if (replyMessageValue !== undefined) {
          this.replymessage = replyMessageValue;
        }
      }
      
      this.messageObj.replyMessage =  this.replymessage;
      this.messageObj.senderEmail = this.userconnect.email;
      this.messageObj.chat = { idRoom: this.idRoom };
  console.log('messsgae;'+this.replymessage)
      this.chatService.addMessageToChatRoom(this.messageObj).subscribe(
        (data: any) => {
          
          console.log('Message sent successfully:', data);
          this.chatForm.reset();
  
          // Ensure this.idRoom is a valid number before calling fetchMessagesByChatId
          if (typeof this.idRoom === 'number') {
            this.fetchMessagesByChatId(this.idRoom); // Refresh message list after sending message
          }
        },
        (error: any) => {
          console.error('Error sending message:', error);
        }
      );
    } else {
      console.error('Sender email or idRoom is null:', this.senderEmail, this.idRoom);
      // Handle the case where senderEmail or idRoom is null (e.g., show an error message)
    }
  }
  goToChat(username: string): void {
    // Appel au service pour récupérer le chat correspondant avec le username
    this.chatService.getChatByFirstUserNameAndSecondUserName(username, this.firstFirstName || '').subscribe(
      (data: Room[]) => {
        if (data.length > 0) {
          this.idRoom = data[0].idRoom; // Récupérer l'ID de la conversation
          sessionStorage.setItem('idRoom', this.idRoom.toString()); // Stocker l'ID de la conversation dans sessionStorage
        } else {
          // Si la conversation n'existe pas, créer une nouvelle conversation
          this.chatObj.firstFirstName = this.firstFirstName || '';
          this.chatObj.secondFirstName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (chatData: Room) => {
              this.idRoom = chatData.idRoom;
              sessionStorage.setItem('idRoom', this.idRoom.toString()); // Stocker l'ID de la nouvelle conversation
            },
            (error: any) => {
              console.error('Erreur lors de la création de la conversation:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données de la conversation:', error);
      }
    );
  }

  routeX(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome(): void {
    this.router.navigateByUrl('');
  }

  formatTime(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(11, 16);
  }
}
