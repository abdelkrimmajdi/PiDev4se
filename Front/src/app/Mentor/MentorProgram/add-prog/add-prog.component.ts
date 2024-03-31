import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorProgramService } from 'src/app/services/mentor-program.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-prog',
  templateUrl: './add-prog.component.html',
  styleUrls: ['./add-prog.component.scss']
})
export class AddProgComponent {
 
  constructor(private consP:MentorProgramService, private route:Router){}
  AddForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(4)]),
    description: new FormControl('',[Validators.required,Validators.maxLength(100)]), 
    type: new FormControl('',[Validators.required,Validators.minLength(4)]),
    objectf: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    duration: new FormControl('',[Validators.required,Validators.min(1)]),
    picture: new FormControl(''),
  })

  save(){
    console.log(this.AddForm.value)
   // this.ps.addproduct(this.registerForm.value as any)
   this.consP.createMentorProgram(this.AddForm.value as any).subscribe(
    ()=>{this.route.navigateByUrl('/admin/MentorProg')}
   )
  }
  reset(){
    this.AddForm.reset()
  }

}
