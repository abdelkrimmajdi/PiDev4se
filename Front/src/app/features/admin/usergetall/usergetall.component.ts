import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usergetall',
  templateUrl: './usergetall.component.html',
  styleUrls: ['./usergetall.component.scss']
})
export class UsergetallComponent {
  listUser: User[] = [];
  searchText: string = '';
  selectedRole: string=''

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.listUser = res;
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

    // Filtrer par rôle si un rôle est sélectionné
    if (this.selectedRole) {
      filteredUsers = filteredUsers.filter(user => user.role === this.selectedRole);
    }

    // Filtrer par nom, prénom ou email si la recherche est effectuée
    if (this.searchText.trim() !== '') {
      filteredUsers = filteredUsers.filter(user => {
        return user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) || 
               user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
               user.email.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    return filteredUsers;
  }
}