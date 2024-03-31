
import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from "../model/role.enum";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginPayload } from '../model/login-payload';
import { FormBuilder } from '@angular/forms';
import { HeaderFrontComponent } from '../FrontOffice/header-front/header-front.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User()
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,) { }
  


  login() {
    const payload: LoginPayload = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };


    this.authService.login(payload).subscribe((res: any) => {
      console.log(res);
  
      if (res && res.userDetails) {
     
        if (res.userDetails.enabled) {
          // L'utilisateur est activé, procédez normalement
         
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          if (res.userDetails.role === Role.USER) {
            this.router.navigateByUrl('');
          } else if (res.userDetails.role === Role.COACH) {
            this.router.navigateByUrl('/admin');
          } else if (res.userDetails.role === Role.NUTRITIONISTE) {
            this.router.navigateByUrl('/admin');
          } else if (res.userDetails.role === Role.MENTOR) {
            this.router.navigateByUrl('/admin');
          } else {
            // Rôle non reconnu, naviguer vers une page par défaut
            this.router.navigateByUrl('/admin');
          }
  
          Toast.fire({
            icon: 'success',
            title: 'Connexion réussie'
          });
        } else {
        
          // Le compte n'est pas activé, affichez un message d'erreur
          localStorage.setItem('userconnect', JSON.stringify(res.userDetails));
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem("state", "0");
  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          if (res.userDetails.role === Role.USER) {
            this.router.navigateByUrl('');
          } else if (res.userDetails.role === Role.COACH) {
            this.router.navigateByUrl('/admin');
          } else if (res.userDetails.role === Role.NUTRITIONISTE) {
            this.router.navigateByUrl('/admin');
          } else if (res.userDetails.role === Role.MENTOR) {
            this.router.navigateByUrl('/admin');
          } else {
            // Rôle non reconnu, naviguer vers une page par défaut
            this.router.navigateByUrl('/admin');
          }
  
          Toast.fire({
            icon: 'success',
            title: 'Connexion réussie'
          });
         
        }
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Login failed. Please check your credentials.',
        showConfirmButton: true
      });
    });
  }



  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phonenumber: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', [Validators.required]]
  });

  register(): void {
    const formData = this.registerForm.value;
    this.authService.register(formData).subscribe({
      next: (response: any) => {
        this.authService.SetRegistredUser(this.user);
        Swal.fire({
          icon: 'success',
          title: 'Veuillez confirmer votre Compte',
          text: 'Veuillez confirmer votre Compte',
          showConfirmButton: false,
          timer: 1500
         
          
        }); this.router.navigate(['/verifemail']);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de l\'inscription',
          footer: 'Veuillez réessayer'
        });
      }
    });
  }
}
