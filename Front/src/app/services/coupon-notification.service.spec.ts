import { TestBed } from '@angular/core/testing';

import { CouponNotificationService } from './coupon-notification.service';

describe('CouponNotificationService', () => {
  let service: CouponNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
