import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREATEMEALComponent } from './createmeal.component';

describe('CREATEMEALComponent', () => {
  let component: CREATEMEALComponent;
  let fixture: ComponentFixture<CREATEMEALComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CREATEMEALComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CREATEMEALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
