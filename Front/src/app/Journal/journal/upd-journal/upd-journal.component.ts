import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/model/Journal';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-upd-journal',
  templateUrl: './upd-journal.component.html',
  styleUrls: ['./upd-journal.component.scss']
})
export class UpdJournalComponent {
  idJo!: number;
  j!: Journal;
  errorMessage: string = '';
  UpdateForm!: FormGroup; // Definite assignment assertion

  constructor(
    private journalService: JournalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idJo = this.route.snapshot.params['idJo'];
    this.UpdateForm = new FormGroup({
      reflexion: new FormControl('',[Validators.required,Validators.minLength(4)]),
    });

    this.journalService.getJournalById(this.idJo).subscribe(
      (data: Journal) => {
        console.log('Received data:', data);
        this.j = data;
        console.log('Form before patching:', this.UpdateForm.value);
        this.UpdateForm.patchValue(this.j);
        console.log('Form after patching:', this.UpdateForm.value);
      },
      error => {
        this.errorMessage = 'Failed to fetch program details. Please try again later.';
        console.error('Error fetching program details:', error);
      }
    );
  }

  save() {
    this.journalService.updateJournal(this.UpdateForm.value as any, this.idJo).subscribe(
      () => this.router.navigateByUrl('/GetJournals'),
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
