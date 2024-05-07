import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionfrontComponent } from './subscriptionfront.component';

describe('SubscriptionfrontComponent', () => {
  let component: SubscriptionfrontComponent;
  let fixture: ComponentFixture<SubscriptionfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
