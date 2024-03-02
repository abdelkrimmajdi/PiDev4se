import { Component } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new User();
  constructor() { }
  ngOnInit() {
    
  }
  onLoggedin() {
    console.log(this.user)
  }

}
