import { Component } from '@angular/core';
import { Role } from 'src/app/model/role.enum';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  
}
