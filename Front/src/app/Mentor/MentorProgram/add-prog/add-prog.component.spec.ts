import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgComponent } from './add-prog.component';

describe('AddProgComponent', () => {
  let component: AddProgComponent;
  let fixture: ComponentFixture<AddProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
