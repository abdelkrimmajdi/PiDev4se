import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhysiotherapistComponent } from './update-physiotherapist.component';

describe('UpdatePhysiotherapistComponent', () => {
  let component: UpdatePhysiotherapistComponent;
  let fixture: ComponentFixture<UpdatePhysiotherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhysiotherapistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhysiotherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
