import { Component } from '@angular/core';
<<<<<<< HEAD
import { Image } from 'src/app/model/image.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
=======
import { User } from 'src/app/model/user.model';

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usergetall',
  templateUrl: './usergetall.component.html',
  styleUrls: ['./usergetall.component.scss']
})
<<<<<<< HEAD
export class UsergetallComponent {
  listUser: User[] = [];
  searchText: string = '';
  selectedRole: string=''
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  constructor(public userService: UserService,private auth:AuthService) {}

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.listUser = res;
      this.listUser.forEach((user) => {
        this.auth.loadImage(user.image.idImage).subscribe((img: Image) => {
          user.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.getAllUser());
  }

  updateRole(user: User) {
    this.userService.updateUserByAdmin(user.id, user.role).subscribe(() => {
      this.getAllUser();
    });
  }

  isAdmin(user: User): boolean {
    // Ajoutez ici la logique pour vérifier si l'utilisateur est un administrateur
    return true; // Pour l'exemple, supposons que l'utilisateur est toujours un administrateur
  }
 
  filterUsers() {
    let filteredUsers = this.listUser;


    if (this.selectedRole) {
      filteredUsers = filteredUsers.filter(user => user.role === this.selectedRole);
    }


    if (this.searchText.trim() !== '') {
      filteredUsers = filteredUsers.filter(user => {
        return user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.phonenumber.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    return filteredUsers;
  }
=======
  
export class UsergetallComponent {
  listUser: User[] = [];
  constructor(public userService: UserService) { }
 
  getAllUser() {

    this.userService.getAllUser().subscribe((res: any) => {
      this.listUser = res;
    });
  }
  ngOnInit() {
    this.getAllUser();
  }
  delete(id: number) {
    this.userService.deleteUser(id).subscribe(
      ()=>this.ngOnInit()
    )
  }

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}