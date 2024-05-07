import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Journal } from 'src/app/model/Journal';
import { PersonalObjectif } from 'src/app/model/PersonalObjectif';
import { JournalService } from 'src/app/services/journal.service';
import { PoService } from 'src/app/services/po.service';

@Component({
  selector: 'app-assign-po',
  templateUrl: './assign-po.component.html',
  styleUrls: ['./assign-po.component.scss']
})
export class AssignPoComponent {
  idPerOb!: number;
  idJo!: number;
  Pos: PersonalObjectif[] = [];
  journals: Journal[] = [];

  constructor(
    private journalService : JournalService,
    private poService: PoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchJournals();
    this.fetchPo();
  }

  fetchJournals(): void {
    this.journalService.getAllJournals().subscribe({
      next: (data: Journal[]) => {
        this.journals = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  fetchPo(): void {
    this.poService.getAllPo().subscribe({
      next: (data: PersonalObjectif[]) => {
        this.Pos = data;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      }
    });
  }

  assignPoToJournal(): void {
    if (!this.idPerOb || !this.idJo) {
      console.error('Please select a personal objective and a journal.');
      return;
    }

    console.log('Assigning Po to Journal...');
    console.log('Personal Objective ID:', this.idPerOb);
    console.log('Journal ID:', this.idJo);

    this.poService.assignPoToJournal(this.idPerOb, this.idJo).subscribe({
      next: () => {
        console.log('Po assigned to Journal successfully.');
        // Navigate back to the previous page after successful assignment
        this.router.navigate(['/GetJournals']); // Replace '/previous-page' with the appropriate URL of the previous page
      },
      error: (error) => {
        console.error('Error assigning Po to Journal:', error);
      }
    });
  }
}
