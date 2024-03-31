import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorExerciceComponent } from './mentor-exercice.component';

describe('MentorExerciceComponent', () => {
  let component: MentorExerciceComponent;
  let fixture: ComponentFixture<MentorExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
