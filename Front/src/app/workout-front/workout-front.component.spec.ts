import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutFrontComponent } from './workout-front.component';

describe('WorkoutFrontComponent', () => {
  let component: WorkoutFrontComponent;
  let fixture: ComponentFixture<WorkoutFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
