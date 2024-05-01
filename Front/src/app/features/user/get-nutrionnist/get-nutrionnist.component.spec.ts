import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNutrionnistComponent } from './get-nutrionnist.component';

describe('GetNutrionnistComponent', () => {
  let component: GetNutrionnistComponent;
  let fixture: ComponentFixture<GetNutrionnistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNutrionnistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetNutrionnistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
