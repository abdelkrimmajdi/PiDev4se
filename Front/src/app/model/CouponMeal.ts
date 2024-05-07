export interface CouponMeal {
    id: number;
    name: string;
    discountPercentage: number;
    minTotalPrice: number;
    maxTotalPrice: number;
    expiryDate: Date;
  }
  