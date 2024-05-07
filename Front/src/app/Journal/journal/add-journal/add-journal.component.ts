  import { Component } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
import { JournalService } from 'src/app/services/journal.service';

  @Component({
    selector: 'app-add-journal',
    templateUrl: './add-journal.component.html',
    styleUrls: ['./add-journal.component.scss']
  })
  export class AddJournalComponent {
    constructor(private consP:JournalService, private route:Router){}
    AddForm = new FormGroup({
      reflexion: new FormControl('',[Validators.required,Validators.minLength(4)]),
    })

    save(){
      console.log(this.AddForm.value)
    // this.ps.addproduct(this.registerForm.value as any)
    this.consP.createJournal(this.AddForm.value as any).subscribe(
      ()=>{this.route.navigateByUrl('/GetJournals')}
    )
    }
    reset(){
      this.AddForm.reset()
    }

  }
