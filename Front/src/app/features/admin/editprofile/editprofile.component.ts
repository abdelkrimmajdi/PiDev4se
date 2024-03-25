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
  updatePasswordForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [this.userconnect.id], 
      firstName: [this.userconnect.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.userconnect.lastName, Validators.required],
      email: [this.userconnect.email, Validators.required],
      password: []
    });
    this.updatePasswordForm = this.formBuilder.group({
      id: [this.userconnect.id], 
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator }); // Appel de la fonction de validation personnalisée
}


// Fonction de validation personnalisée pour vérifier que les deux mots de passe correspondent
passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
  } else {
      formGroup.get('confirmPassword')?.setErrors(null);
  }
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
          window.location.href = "/admin";
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
    if (this.updatePasswordForm.valid) {
        // Vérification supplémentaire pour s'assurer que les mots de passe correspondent
        if (this.updatePasswordForm.hasError('mismatch')) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Les mots de passe ne correspondent pas'
            });
            return;
        }

        this.userService.updatePassword(this.userconnect.id, this.updatePasswordForm.value.password).subscribe((res: any) => {
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez vérifier le formulaire pour les erreurs'
        });
    }
}

}
