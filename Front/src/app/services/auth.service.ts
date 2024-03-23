
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginPayload } from '../model/login-payload';


@Injectable({
providedIn: 'root'
})

export class AuthService {
constructor(private http: HttpClient,private router: Router) { }

public loggedUser!: string;
public isloggedIn: Boolean = false;
public roles!: string[];
public token!: string;
login(user: LoginPayload) {
  return this.http.post('http://localhost:8081/api/v1/auth/signin', user);
}
register(formData: FormData) {
  return this.http.post('http://localhost:8081/api/v1/auth/signup', formData);
}
getToken() {
return localStorage.getItem('token')
} 
logoutUser() {
  localStorage.removeItem('token')
  this.router.navigateByUrl('/acceuil');
}
loggedInt() {
  return !!localStorage.getItem('token')
}

}