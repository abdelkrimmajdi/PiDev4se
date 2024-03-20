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
  apiUrl : string = `http://localhost:8081/api/v1/auth`
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public token!: string;

  login(user: LoginPayload) {
    return this.http.post(`http://localhost:8081/api/v1/auth/signin`, user);
  }
  register(formData: FormData) {
    return this.http.post(`http://localhost:8081/api/v1/auth/signup`, formData);
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
  forgetPassword(email: string) {
    return this.http.post(`http://localhost:8081/api/v1/auth/forgetpassword?email=${email}`,{});
  }
  resetPassword(passwordResetToken: string, newPassword: string) {
    return this.http.post(`http://localhost:8081/api/v1/auth/resetPassword/${passwordResetToken}?newPassword=${newPassword}`, {});
  }
  public registredUser: User = new User();
  SetRegistredUser(user: User) {
    this.registredUser =user;
  }
  getRegistredUser() {
    return this.registredUser;
  }
  validateEmail(code: string) {
    return this.http.get<User>(`http://localhost:8081/api/v1/auth/verifyEmail/` + code);
  }
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, you can check if there is a valid token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // Implement your logic to log out the user
    // For example, you can remove the token from local storage
    localStorage.removeItem('token');
    this.isloggedIn = false;
  }
}

