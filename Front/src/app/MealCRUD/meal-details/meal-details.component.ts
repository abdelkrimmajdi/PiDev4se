import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/model/Meal.model';
import { MealServiceService } from 'src/app/services/meal-service.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit{
 
  id !: number
  meal !: Meal
  constructor(private route : ActivatedRoute , private mealservice : MealServiceService , private router : Router) {}
  ngOnInit() : void {

    this.id=this.route.snapshot.params['id'];
    this.meal = new Meal();
    this.mealservice.getMealById(this.id).subscribe(data => {
      this.meal = data;
    });
  }
  tooltipClicked() {
    this.router.navigate(['/admin/all-meal']);
  }
}

