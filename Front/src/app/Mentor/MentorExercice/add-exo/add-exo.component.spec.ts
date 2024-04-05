import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExoComponent } from './add-exo.component';

describe('AddExoComponent', () => {
  let component: AddExoComponent;
  let fixture: ComponentFixture<AddExoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
