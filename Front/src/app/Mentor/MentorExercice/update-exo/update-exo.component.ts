import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorExercice } from 'src/app/model/MentorExercice';
import { MentorExerciceService } from 'src/app/services/mentor-exercice.service';

@Component({
  selector: 'app-update-exo',
  templateUrl: './update-exo.component.html',
  styleUrls: ['./update-exo.component.scss']
})
export class UpdateExoComponent implements OnInit {
  idExercice!: number;
  m!: MentorExercice;
  errorMessage: string = '';
  UpdateForm: FormGroup;
  
  constructor(
    private consP: MentorExerciceService,
    private route: Router,
    private act: ActivatedRoute
  ) {
    this.UpdateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      priority: new FormControl('', [Validators.required, Validators.min(1)]),
      exeTime: new FormControl('', [Validators.required, Validators.min(1)]),
      picture: new FormControl(''),
    });
  }

  ngOnInit() {
    this.idExercice = this.act.snapshot.params['idExercice'];
    this.consP.getMentorExerciceById(this.idExercice).subscribe(
      (data: MentorExercice) => {
        console.log('Received data:', data);
        this.m = data;
        console.log('Form before patching:', this.UpdateForm.value);
        this.UpdateForm.patchValue(this.m);
        console.log('Form after patching:', this.UpdateForm.value);
      },
      error => {
        this.errorMessage = 'Failed to fetch exercise details. Please try again later.';
        console.error('Error fetching exercise details:', error);
      }
    );
  }

  save() {
    this.consP.updateMentorExercice(this.UpdateForm.value as any, this.idExercice).subscribe(
      () => this.route.navigateByUrl('/admin/MentorExo'),
      error => {
        this.errorMessage = 'Failed to update exercise. Please try again later.';
        console.error('Error updating exercise:', error);
      }
    );
  }

  reset() {
    this.UpdateForm.reset();
  }
}
