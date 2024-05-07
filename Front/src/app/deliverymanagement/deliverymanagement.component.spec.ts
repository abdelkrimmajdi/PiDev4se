import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverymanagementComponent } from './deliverymanagement.component';

describe('DeliverymanagementComponent', () => {
  let component: DeliverymanagementComponent;
  let fixture: ComponentFixture<DeliverymanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverymanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
