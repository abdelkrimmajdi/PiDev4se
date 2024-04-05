import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutaddComponent } from './workoutadd.component';

describe('WorkoutaddComponent', () => {
  let component: WorkoutaddComponent;
  let fixture: ComponentFixture<WorkoutaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
