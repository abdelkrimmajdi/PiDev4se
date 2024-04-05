import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResponsesComponent } from './all-responses.component';

describe('AllResponsesComponent', () => {
  let component: AllResponsesComponent;
  let fixture: ComponentFixture<AllResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllResponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
