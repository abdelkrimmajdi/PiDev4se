import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProgComponent } from './update-prog.component';

describe('UpdateProgComponent', () => {
  let component: UpdateProgComponent;
  let fixture: ComponentFixture<UpdateProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
