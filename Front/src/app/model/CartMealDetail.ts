export class CartMealDetail {
  mealName: string;
  mealPrice: number;
  quantity: number;

  constructor(mealName: string, mealPrice: number, quantity: number) {
    this.mealName = mealName;
    this.mealPrice = mealPrice;
    this.quantity = quantity;
  }
}
