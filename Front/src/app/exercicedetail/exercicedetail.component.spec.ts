import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicedetailComponent } from './exercicedetail.component';

describe('ExercicedetailComponent', () => {
  let component: ExercicedetailComponent;
  let fixture: ComponentFixture<ExercicedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
