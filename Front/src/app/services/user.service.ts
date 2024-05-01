import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
<<<<<<< HEAD
import { Role } from '../model/role.enum';
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }



<<<<<<< HEAD
  apiUrl: string = `http://localhost:8081/api/v1/auth`;

  updateUser(user: User) {
 
    return this.http.put(`http://localhost:8081/api/v1/user/update`, user);
  }
  updateAdmin(user: User) {
 
    return this.http.put(`http://localhost:8081/api/v1/admin/updateuser`, user);
  }


  getAllUser() {

    return this.http.get<User[]>(`http://localhost:8081/api/v1/admin/getall`);
  }
  deleteUser(idUser: number) {
    return this.http.delete('http://localhost:8081/api/v1/admin/delete' + '/' + idUser);
  }


    updatePassword(idUser:number , password:string){
      return this.http.put(`http://localhost:8081/api/v1/admin/updatePassword/${idUser}/${password}`, {})
    
    }
    getOneUser(idUser: number) {
      return this.http.get<User>(`http://localhost:8081/api/v1/admin//etudiant/${idUser}`);
    }
    updateUserByAdmin(userId: number, newRole: Role) {
      return this.http.put(`http://localhost:8081/api/v1/admin/${userId}?newRole=${newRole}`, {});
    }
  
  
  }

=======
  

  getAllUser() {

  
    return this.http.get<User[]> ('http://localhost:8081/api/v1/admin/getall')
  }
  deleteUser(idUser: number) {
    return this.http.delete( 'http://localhost:8081/api/v1/admin/delete'+'/'+idUser);
  }

}
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
