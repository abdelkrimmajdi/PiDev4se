import { Component } from '@angular/core';
import { MenuserviceService } from 'src/app/services/menuservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
  
export class CaloriesComponent {
  foodName: string = '';
  calories!: number;
  foodNames: string = '';
  caloriesMap: { [key: string]: number } = {};

  constructor(private caloriesService: MenuserviceService) {}

  getCalories(): void {
    this.caloriesService.calculateCalories(this.foodName)
      .subscribe(calories => {
        this.calories = calories;
        alert(`Calories de ${this.foodName} : ${this.calories}`);
      }, error => {
        console.error('Error fetching calories:', error);
      });
  }

  getCaloriess(): void {
    const foodNamesArray = this.foodNames.split(',').map(name => name.trim());
    this.caloriesService.calculateCaloriesOfFoods(foodNamesArray)
      .subscribe(caloriesMap => {
        this.caloriesMap = caloriesMap;
        const totalCalories = this.getTotalCalories();
        Swal.fire({
          title: 'Total Calories',
          text: `Total Calories: ${totalCalories}`,
          icon: 'info'
        });
        console.log('Calories for each food:', this.caloriesMap);
      }, error => {
        console.error('Error fetching calories:', error);
      });
  }

  getFoodNames(): string[] {
    return Object.keys(this.caloriesMap);
  }
  
  getTotalCalories(): number {
    let totalCalories = 0;
    for (const food in this.caloriesMap) {
        if (this.caloriesMap.hasOwnProperty(food)) {
            totalCalories += this.caloriesMap[food];
        }
    }
    return totalCalories;
  }
}
