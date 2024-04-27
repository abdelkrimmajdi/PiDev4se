import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NutrionnistProgram } from 'src/app/model/NutrionnistProgram';
import { User } from 'src/app/model/user.model';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-programm',
  templateUrl: './add-programm.component.html',
  styleUrls: ['./add-programm.component.scss']
})
export class AddProgrammComponent {
  constructor(private router: Router, private NutritionnistServices: NutritionnistService, private formBuilder: FormBuilder) { }
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  AddProgramForm = new FormGroup({
    nameProg : new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    userId: new FormControl(this.userconnect.id)
  });

  saveProgram(): void {
    const formData = this.AddProgramForm.value;
    this.NutritionnistServices.saveNutrisionistProgram(formData as any, this.userconnect.id)
      .subscribe({
        next: (response: any) => { 
          Swal.fire({
            icon: 'success',
            title: 'Programme ajouté avec succès',
            text: 'Programme ajouté avec succès',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (error) => {
          console.error('Error while saving program:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue',
            footer: 'Veuillez réessayer'
          });
        }
      });
  }
  
  

  
  AddProg(): void{

    const formData = this.AddProgramForm.value;
 
console.log(formData)
      this.NutritionnistServices.createProgramm(formData as any).subscribe({
        next: (response: any) => { 
          Swal.fire({
            icon: 'success',
            title: 'Programme ajouter avec succées',
            text: 'Programme ajouter avec succées',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/Program']);
        },
        error: (error: any) => {
        
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue',
            footer: 'Veuillez réessayer'
          });
        }
      });
  
}
  
}
