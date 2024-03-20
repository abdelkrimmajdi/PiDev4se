import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  updateForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [this.userconnect.id], 
      firstName: [this.userconnect.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.userconnect.lastName, Validators.required],
      email: [this.userconnect.email, Validators.required],
      password: [, Validators.required]
    });
  }
 

  updateUser() {
    if (this.updateForm.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.updateForm.value
      };

      this.userService.updateAdmin(updatedUser).subscribe((res: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Information modifiée avec succès',
          showConfirmButton: false,
          timer: 3000
        });
        localStorage.setItem('userconnect', JSON.stringify(res));
        setTimeout(() => {
          window.location.href = "http://localhost:4200/login";
        }, 3000);
      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour',
          text: err.message
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please check your form for errors'
      });
    }
  }

  updatePassword() {
    this.userService.updatePassword(this.userconnect.id, this.updateForm.value.password).subscribe((res: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Mot de passe modifié avec succès'
      });
      localStorage.setItem('userconnect', JSON.stringify(res));
      setTimeout(() => {
        window.location.href = "http://localhost:4200/admin";
      }, 1000);
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la modification du mot de passe'
      });
    });
  }
}
