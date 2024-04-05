import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicefrontComponent } from './exercicefront.component';

describe('ExercicefrontComponent', () => {
  let component: ExercicefrontComponent;
  let fixture: ComponentFixture<ExercicefrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicefrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
