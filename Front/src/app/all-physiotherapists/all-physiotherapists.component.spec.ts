import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPhysiotherapistsComponent } from './all-physiotherapists.component';

describe('AllPhysiotherapistsComponent', () => {
  let component: AllPhysiotherapistsComponent;
  let fixture: ComponentFixture<AllPhysiotherapistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPhysiotherapistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPhysiotherapistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
