import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
 
})
export class EditProfileComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  

  updateForm: FormGroup;

  constructor(private etudiantService: UserService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.userconnect;
   
  }



  updateEtudiant() {
    if (this.updateForm.valid) {
        this.etudiantService.updateUser(this.updateForm.value as any).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Information modifiée avec succès',
                showConfirmButton: false,
                timer: 3000
            });
            localStorage.setItem('userconnect', JSON.stringify(res));
            setTimeout(() => {
                window.location.href = "http://localhost:4200/admin";
            }, 3000);
        }, error => {
            Swal.fire({
                icon: 'error',
                title: 'Erreur lors de la mise à jour',
                text: error.message || 'Une erreur s\'est produite lors de la mise à jour.'
            });
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Form',
            text: 'Veuillez vérifier votre formulaire pour les erreurs'
        });
    }
}

  

  updatePassword() {
    this.etudiantService.updatePassword(this.userconnect.id, this.updateForm.value.password).subscribe(res => {
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

      Toast.fire({
        icon: 'success',
        title: 'Mot de passe modifié avec succès'
      });

      localStorage.setItem('userconnect', JSON.stringify(res));
      setTimeout(() => {
        window.location.href = "http://localhost:4200/admin";
      }, 1000);
    }, err => { // Prefixing with underscore to indicate intentional unused parameter
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la modification du mot de passe'
      });
    });
  }
}