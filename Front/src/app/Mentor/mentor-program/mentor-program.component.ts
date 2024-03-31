import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MentorProgram } from 'src/app/model/MentorProgram';
import { MentorProgramService } from 'src/app/services/mentor-program.service';

@Component({
  selector: 'app-mentor-program',
  templateUrl: './mentor-program.component.html',
  styleUrls: ['./mentor-program.component.scss']
})
export class MentorProgramComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<MentorProgram>;
  displayedColumns: string[] = ['idMentorProg', 'name', 'description', 'type', 'objectf', 'duration', 'picture', 'actions'];
  searchCriteria: string = '';

  constructor(private mentorProgramService: MentorProgramService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MentorProgram>([]);
    this.dataSource.sort = this.sort;
    this.searchPrograms();
  }

  searchPrograms(): void {
    if (this.searchCriteria.trim()) {
      this.mentorProgramService.searchProgramsByName(this.searchCriteria).subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      });
    } else {
      this.mentorProgramService.getAllMentorPrograms().subscribe({
        next: (data: MentorProgram[]) => {
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      });
    }
  }

  deleteProgram(idMentorProg: number): void {
    this.mentorProgramService.deleteMentorProgram(idMentorProg).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(program => program.idMentorProg !== idMentorProg);
      },
      (error) => console.error(error)
    );
  }
}
