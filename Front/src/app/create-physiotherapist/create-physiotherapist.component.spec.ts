import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhysiotherapistComponent } from './create-physiotherapist.component';

describe('CreatePhysiotherapistComponent', () => {
  let component: CreatePhysiotherapistComponent;
  let fixture: ComponentFixture<CreatePhysiotherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePhysiotherapistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePhysiotherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
