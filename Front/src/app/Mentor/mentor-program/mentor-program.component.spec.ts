import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProgramComponent } from './mentor-program.component';

describe('MentorProgramComponent', () => {
  let component: MentorProgramComponent;
  let fixture: ComponentFixture<MentorProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
