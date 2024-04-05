import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallMentorComponent } from './getall-mentor.component';

describe('GetallMentorComponent', () => {
  let component: GetallMentorComponent;
  let fixture: ComponentFixture<GetallMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallMentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
