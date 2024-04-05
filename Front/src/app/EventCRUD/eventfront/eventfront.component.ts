import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Demande } from 'src/app/model/Demande';
import { Event } from 'src/app/model/Event';
import { DemandeService } from 'src/app/services/demande.service';
import { EventServiceService } from 'src/app/services/event-service.service';
import { FavorisService } from 'src/app/services/favoris.service';

@Component({
  selector: 'app-eventfront',
  templateUrl: './eventfront.component.html',
  styleUrls: ['./eventfront.component.scss']
})
export class EventfrontComponent {
  public events!:any[];  
  
  public eventfa!:any[];  
  event:any = new Event();
  jwt:any = sessionStorage.getItem('email');
  eventf:any = new Event(); 
  demande:Demande = new Demande(); 
  constructor(private eventservice:EventServiceService,  private favservice:FavorisService, private demandeservice:DemandeService,private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {  
  }   
  public  part(id:number){
    

           this.demandeservice.participate(id,this.demande).subscribe(
       
           
           );
    
  location.reload()
    }



  public getEvents():void{
      this.eventservice.getAllEvents().subscribe(
        (response:any[])=>{
          this.events=response;
          console.log(response);
        },
          (error:HttpErrorResponse)=>
          {
            alert(error.message);
          }
        );
        
  
  
}
public getEventf():void{
  this.demandeservice.getAllDemandes().subscribe(
    (response:any[])=>{
      this.eventfa=response;
      console.log(response);
    },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    );
    


}
 
ngOnInit(): void {
  const script = this.renderer.createElement('script');
  script.type = 'text/javascript';
  script.src = 'assets/FrontOffice/js/main.js';
  script.onload = () => {
    console.log('Script loaded');
  };
  this.renderer.appendChild(this.document.body, script);
  this.getEvents();
  
  this.getEventf();
} 
}
