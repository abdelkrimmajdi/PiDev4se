import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginPayload } from '../model/login-payload';
import { Image } from '../model/image.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient,private router: Router) { }
  apiUrl : string = `http://localhost:8081/api/v1/auth`
  public loggedUser!: string;
  public isLoggedIn!: Boolean;
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
 
  uploadImage(file: File, filename: string):Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    return this.http.post(`http://localhost:8081/image/upload`, imageFormData);
  }
  loadImage(id: number):Observable<Image> {
    return this.http.get<Image>(`http://localhost:8081/image/get/info/${id}` );
  }
  logout() {
}

  
}

