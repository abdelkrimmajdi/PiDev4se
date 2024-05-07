import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/app/model/Journal';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { PoService } from 'src/app/services/po.service';
import { JournalService } from 'src/app/services/journal.service';
import { PersonalObjectif } from 'src/app/model/PersonalObjectif';

@Component({
  selector: 'app-detail-journal', 
  templateUrl: './detail-journal.component.html',
  styleUrls: ['./detail-journal.component.scss']
})
export class DetailJournalComponent implements OnInit, OnDestroy {
  idJo!: number;
  j!: Journal;
  pos: PersonalObjectif[] = [];
  personalObjectifsDoneCount: number = 0;
  personalObjectifsUnDoneCount: number = 0;
  chartInstance: Chart<'pie', number[], string> | null = null;

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private poService: PoService,
    private journalService: JournalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadJournalDetails();
  }
  
  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  loadJournalDetails(): void {
    this.idJo = this.activatedRoute.snapshot.params['idJo'];
    this.journalService.getJournalById(this.idJo).subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        this.j = data[0];
        this.loadPersonalObjectifs();
      }
    });
  }

  loadPersonalObjectifs(): void {
    this.journalService.getPOForJournal(this.idJo).subscribe((pos) => {
      this.pos = pos;
      this.countPersonalObjectifs();
    });
  }
  countPersonalObjectifs(): void {
    // Appeler le service HTTP pour compter les objectifs terminés
    this.journalService.countPersonalObjectifsDone().subscribe(
      (countDone) => {
        this.personalObjectifsDoneCount = countDone;
        console.log('Personal Objectifs Done Count:', this.personalObjectifsDoneCount);
  
        // Appeler le service HTTP pour compter les objectifs non terminés
        this.journalService.countPersonalObjectifsUnDone().subscribe(
          (countUndone) => {
            this.personalObjectifsUnDoneCount = countUndone;
            console.log('Personal Objectifs Undone Count:', this.personalObjectifsUnDoneCount);
            console.log(this.personalObjectifsDoneCount);
            console.log(this.personalObjectifsUnDoneCount);

            // Mettre à jour le graphique après avoir obtenu les compteurs
            this.updateChart();
          },
          (error) => {
            console.error('Error counting Undone Personal Objectifs:', error);
          }
        );
      },
      (error) => {
        console.error('Error counting Done Personal Objectifs:', error);
      }
    );
  }
  

  updateChart(): void {
    if (this.myChart && this.myChart.nativeElement) {
      const ctx = this.myChart.nativeElement.getContext('2d');
      
      if (ctx) {
        if (this.chartInstance) {
          this.chartInstance.destroy(); // Destroy the existing chart
        }
  
        const data: ChartData<'pie', number[], string> = {
          labels: ['Done', 'UnDone'],
          datasets: [
            {
              data: [this.personalObjectifsDoneCount || 0, this.personalObjectifsUnDoneCount || 0],
              backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1
            }
          ]
        };
  
        const options: ChartOptions<'pie'> = {
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            title: {
              display: true,
              text: 'Personal Objectives Status'
            }
          }
        };
  
        // Delay chart creation by 500 milliseconds (adjust as needed)
        setTimeout(() => {
          this.chartInstance = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options
          });
        }, 500);
      } else {
        console.error('Canvas context is null or undefined. Chart cannot be created.');
      }
    }
  }
  
  onShowChartClick(): void {
    this.countPersonalObjectifs();
  }

  deletePersonalObjectif(id: number): void {
    this.poService.deletePo(id).subscribe(() => {
      console.log('Personal objective deleted successfully.');
      this.loadPersonalObjectifs(); // Recharger les objectifs personnels après la suppression
    }, (error) => {
      console.error('Error deleting personal objective:', error);
    });
  }
}
