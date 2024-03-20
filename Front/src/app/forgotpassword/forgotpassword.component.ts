import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private router: Router, private authenticationService: AuthService) { }

  forgotPassword() {
    const email = this.forgotForm.get('email')?.value ?? '';

      this.authenticationService.forgetPassword(email).subscribe((res: any) => {
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
          title: 'Merci de vérifier votre boite mail'
        });
      });
  }
}

