import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.scss']
})
export class HeaderFrontComponent {
  constructor(public authServi: AuthService) { }
  authService() {
    this.authServi.loggedInt
  }
  Logout() {
    this.authServi.logoutUser
  }

}
