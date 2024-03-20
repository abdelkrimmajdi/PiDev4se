import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = new User()

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register(): void {
    const formData = this.registerForm.value;
    this.authService.register(formData).subscribe({
      next: (response: any) => {
        this.authService.SetRegistredUser(this.user);
        Swal.fire({
          icon: 'success',
          title: 'Veuillez confirmer votre email',
          text: 'Veuillez confirmer votre email',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redirection vers la page de vérification de l'e-mail après le message de succès
          this.router.navigate(['/verifEmail']);
        });
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
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Méthode pour naviguer vers la page d'inscription
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Méthode pour vérifier si la page est celle de l'inscription
  isRegisterPage() {
    return this.router.url === '/register';
  }
}
