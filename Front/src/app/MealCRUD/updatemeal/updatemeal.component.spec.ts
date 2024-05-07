import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPDATEMEALComponent } from './updatemeal.component';

describe('UPDATEMEALComponent', () => {
  let component: UPDATEMEALComponent;
  let fixture: ComponentFixture<UPDATEMEALComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UPDATEMEALComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UPDATEMEALComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
