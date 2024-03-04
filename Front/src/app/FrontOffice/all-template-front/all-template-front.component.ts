import { Component,OnInit } from '@angular/core';

import { StyleLoaderService } from '../../style-loader.service';

@Component({
  selector: 'app-all-template-front',
  templateUrl: './all-template-front.component.html',
  styleUrls: ['./all-template-front.component.scss']
})
export class AllTemplateFrontComponent implements OnInit {
  constructor(private styleLoaderService: StyleLoaderService) {}

  ngOnInit(): void {
    this.styleLoaderService.loadStyles([
      '/assets/FrontOffice/css/bootstrap.css',
      '/assets/FrontOffice/css/owl.carousel.min.css',
      '/assets/FrontOffice/css/magnific-popup.css',
      '/assets/FrontOffice/fonts/ionicons/css/ionicons.min.css',
      '/assets/FrontOffice/fonts/fontawesome/css/font-awesome.min.css',
      '/assets/FrontOffice/css/style.css',
      '/assets/FrontOffice/css/animate.css',
      
    ]);
  }

}
