import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }



  

  getAllUser() {

  
    return this.http.get<User[]> ('http://localhost:8081/api/v1/admin/getall')
  }
  deleteUser(idUser: number) {
    return this.http.delete( 'http://localhost:8081/api/v1/admin/delete'+'/'+idUser);
  }

}