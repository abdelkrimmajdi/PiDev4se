import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptiondetailComponent } from './subscriptiondetail.component';

describe('SubscriptiondetailComponent', () => {
  let component: SubscriptiondetailComponent;
  let fixture: ComponentFixture<SubscriptiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptiondetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
