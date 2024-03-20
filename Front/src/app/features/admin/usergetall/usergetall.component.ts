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
}
