import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.scss']
})
export class HeaderFrontComponent implements OnInit {
 isLoggedIn: boolean = false;
  // Add the isLoggingIn property
  isLoggingIn!: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('userconnect');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('state');
  
    this.router.navigateByUrl('/login');
  }
}