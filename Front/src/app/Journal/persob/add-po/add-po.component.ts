import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoService } from 'src/app/services/po.service';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.scss']
})
export class AddPoComponent {
  constructor(private consP:PoService, private route:Router){}
  AddForm = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(4)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(500)]),
    priorite: new FormControl('',[Validators.required,Validators.min(1)]),
    endDate: new FormControl('',Validators.required),
    statut: new FormControl('',Validators.required),
  })

  save(){
    console.log(this.AddForm.value)
 this.consP.createPo(this.AddForm.value as any).subscribe(
    ()=>{this.route.navigateByUrl('/assignPotoJ')}
   )
  }
  reset(){
    this.AddForm.reset()
  }
}
