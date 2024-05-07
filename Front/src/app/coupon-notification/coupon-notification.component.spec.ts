import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponNotificationComponent } from './coupon-notification.component';

describe('CouponNotificationComponent', () => {
  let component: CouponNotificationComponent;
  let fixture: ComponentFixture<CouponNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
