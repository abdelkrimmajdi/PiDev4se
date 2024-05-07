import { TestBed } from '@angular/core/testing';

import { CouponMealService } from './coupon-meal.service';

describe('CouponMealService', () => {
  let service: CouponMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
