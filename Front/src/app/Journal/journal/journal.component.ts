import { Component, OnInit } from '@angular/core';
import { Journal } from 'src/app/model/Journal';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  journals: Journal[] = [];
  userEmail: string | null = null; // Initialize userEmail as null

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    // Retrieve user email from localStorage
    const userConnectJson = localStorage.getItem('userconnect');
    if (userConnectJson) {
      const userData = JSON.parse(userConnectJson);
      this.userEmail = userData.email;
    }

    // Load journals
    this.loadJournals();
  }

  loadJournals(): void {
    this.journalService.getAllJournals().subscribe(
      (data: Journal[]) => {
        this.journals = data;
      },
      (error) => {
        console.error('Error fetching personal objectives:', error);
      }
    );
  }

  deleteJournal(idJo: number): void {
    this.journalService.deleteJournal(idJo).subscribe(
      () => {
        this.journals = this.journals.filter(journal => journal.idJo !== idJo);
      },
      (error) => {
        console.error('Error deleting journal:', error);
      }
    );
  }

  /*sendNotification(): void {
    if (this.userEmail) {
      this.journalService.sendProgramUpdateNotification(this.userEmail).subscribe(
        () => {
          console.log('Reminder update notification sent successfully');
        },
        (error) => {
          console.error('Error sending Reminder update notification:', error);
        }
      );
    } else {
      console.error('User email not found.');
    }
  }*/
}
