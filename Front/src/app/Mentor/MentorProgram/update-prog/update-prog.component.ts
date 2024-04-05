import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { MentorProgram } from 'src/app/model/MentorProgram';

@Component({
  selector: 'app-update-prog',
  templateUrl: './update-prog.component.html',
  styleUrls: ['./update-prog.component.scss']
})
export class UpdateProgComponent implements OnInit {
  idMentorProg!: number;
  m!: MentorProgram;
  errorMessage: string = '';
  UpdateForm!: FormGroup; // Definite assignment assertion

  constructor(
    private mentorProgramService: MentorProgramService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idMentorProg = this.route.snapshot.params['idMentorProg'];
    this.UpdateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      type: new FormControl('', [Validators.required, Validators.minLength(4)]),
      objectf: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      duration: new FormControl('', [Validators.required, Validators.min(1)]),
      picture: new FormControl(''),
    });

    this.mentorProgramService.getMentorProgramById(this.idMentorProg).subscribe(
      (data: MentorProgram) => {
        console.log('Received data:', data);
        this.m = data;
        console.log('Form before patching:', this.UpdateForm.value);
        this.UpdateForm.patchValue(this.m);
        console.log('Form after patching:', this.UpdateForm.value);
      },
      error => {
        this.errorMessage = 'Failed to fetch program details. Please try again later.';
        console.error('Error fetching program details:', error);
      }
    );
  }

  save() {
    this.mentorProgramService.updateMentorProgram(this.UpdateForm.value as any, this.idMentorProg).subscribe(
      () => this.router.navigateByUrl('/admin/MentorProg'),
      error => {
        this.errorMessage = 'Failed to update program. Please try again later.';
        console.error('Error updating program:', error);
      }
    );
  }

  reset() {
    this.UpdateForm.reset();
  }
}
