import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPoComponent } from './assign-po.component';

describe('AssignPoComponent', () => {
  let component: AssignPoComponent;
  let fixture: ComponentFixture<AssignPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
