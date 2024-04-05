import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEtoPComponent } from './assign-eto-p.component';

describe('AssignEtoPComponent', () => {
  let component: AssignEtoPComponent;
  let fixture: ComponentFixture<AssignEtoPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEtoPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEtoPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
