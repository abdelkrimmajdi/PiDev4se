import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MentorExerciceService } from 'src/app/services/mentor-exercice.service';


@Component({
  selector: 'app-add-exo',
  templateUrl: './add-exo.component.html',
  styleUrls: ['./add-exo.component.scss']
})
export class AddExoComponent {
  constructor(private consP: MentorExerciceService, private route: Router) {}
  AddForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    priority: new FormControl('', [Validators.required, Validators.min(1)]),
    exeTime: new FormControl('', [Validators.required, Validators.min(1)]),
    picture: new FormControl(''),
  });

  save() {
    console.log(this.AddForm.value);
    // this.ps.addproduct(this.registerForm.value as any)
    this.consP.createMentorExercice(this.AddForm.value as any).subscribe(
      () => {
        this.route.navigateByUrl('/admin/MentorExo');
      }
    );
  }
  reset() {
    this.AddForm.reset();
  }
}
