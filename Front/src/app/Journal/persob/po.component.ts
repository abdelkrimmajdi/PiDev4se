import { Component, OnInit } from '@angular/core';
import { PersonalObjectif } from 'src/app/model/PersonalObjectif';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { PoService } from 'src/app/services/po.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  personalObjectifs: PersonalObjectif[] = [];

  constructor(private poService: PoService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadPersonalObjectifs();
  }

  loadPersonalObjectifs(): void {
    this.poService.getAllPo().subscribe(
      (data: PersonalObjectif[]) => {
        this.personalObjectifs = data;
        this.checkPersonalObjectivesForNotifications();
      },
      (error) => {
        console.error('Error fetching personal objectives:', error);
      }
    );
  }

  deletePersonalObjectif(id: number): void {
    this.poService.deletePo(id).subscribe(
      () => {
        console.log('Personal objective deleted successfully.');
        // Reload the list after deletion
        this.loadPersonalObjectifs();
      },
      (error) => {
        console.error('Error deleting personal objective:', error);
      }
    );
  }

  checkPersonalObjectivesForNotifications(): void {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentDate = new Date();

    this.personalObjectifs.forEach(obj => {
      const endDate = new Date(obj.endDate);
      const oneWeekBeforeEndDate = new Date(endDate.getTime() - oneWeekInMilliseconds);

      if (currentDate < oneWeekBeforeEndDate) {
        const formattedEndDate = this.datePipe.transform(endDate, 'short');
        const message = `The personal objective '${obj.title}' is ending on ${formattedEndDate}.`;
        this.showNotification(message);
      }
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000 // Duration in milliseconds
    });
  }
}
