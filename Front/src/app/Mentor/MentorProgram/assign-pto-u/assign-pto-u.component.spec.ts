import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPtoUComponent } from './assign-pto-u.component';

describe('AssignPtoUComponent', () => {
  let component: AssignPtoUComponent;
  let fixture: ComponentFixture<AssignPtoUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPtoUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPtoUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
