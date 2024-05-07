import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalObjectif } from 'src/app/model/PersonalObjectif';
import { PoService } from 'src/app/services/po.service';

@Component({
  selector: 'app-upd-po',
  templateUrl: './upd-po.component.html',
  styleUrls: ['./upd-po.component.scss']
})
export class UpdPoComponent {
  idPerOb!: number;
  po!: PersonalObjectif;
  errorMessage: string = '';
  UpdateForm!: FormGroup; // Definite assignment assertion

  constructor(
    private PoService: PoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idPerOb = this.route.snapshot.params['idPerOb'];
    this.UpdateForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(4)]),
      description: new FormControl('',[Validators.required,Validators.maxLength(500)]),
      priority: new FormControl('',[Validators.required,Validators.min(1)]),
      endDate: new FormControl('',Validators.required),
      statut: new FormControl('',Validators.required),  
    });

    this.PoService.getPoById(this.idPerOb).subscribe(
      (data: PersonalObjectif) => {
        console.log('Received data:', data);
        this.po = data;
        console.log('Form before patching:', this.UpdateForm.value);
        this.UpdateForm.patchValue(this.po);
        console.log('Form after patching:', this.UpdateForm.value);
      },
      error => {
        this.errorMessage = 'Failed to fetch program details. Please try again later.';
        console.error('Error fetching program details:', error);
      }
    );
  }

  save() {
    this.PoService.updatePo(this.UpdateForm.value as any, this.idPerOb).subscribe(
      () => this.router.navigateByUrl('/GetPos'),
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
