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

}