import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutdetailComponent } from './workoutdetail.component';

describe('WorkoutdetailComponent', () => {
  let component: WorkoutdetailComponent;
  let fixture: ComponentFixture<WorkoutdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
