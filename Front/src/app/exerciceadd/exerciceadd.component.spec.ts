import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceaddComponent } from './exerciceadd.component';

describe('ExerciceaddComponent', () => {
  let component: ExerciceaddComponent;
  let fixture: ComponentFixture<ExerciceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciceaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
