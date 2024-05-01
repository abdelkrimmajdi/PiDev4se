import { Component } from '@angular/core';
import { Image } from 'src/app/model/image.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NutritionnistService } from 'src/app/services/nutritionnist.service';
import { SelectProgramService } from 'src/app/services/select-program.service';

@Component({
  selector: 'app-get-nutrionnist',
  templateUrl: './get-nutrionnist.component.html',
  styleUrls: ['./get-nutrionnist.component.scss']
})
export class GetNutrionnistComponent {
  constructor(private service: NutritionnistService,private auth:AuthService,private selectedProgramService: SelectProgramService) {} 
  listUser: User[] = [];
  ngOnInit(): void {
    this.service.getAllNutritionnists().subscribe((res: any) => {
      this.listUser = res;
      
      this.listUser.forEach((user) => {
        this.auth.loadImage(user.image.idImage).subscribe((img: Image) => {
          user.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });
  }
  selectProgram(id: number) {
    this.selectedProgramService.IdUser = id;
    console.log('ID Nutrionist:', id);
  }
}
