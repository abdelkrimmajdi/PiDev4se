import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallprogramComponent } from './getallprogram.component';

describe('GetallprogramComponent', () => {
  let component: GetallprogramComponent;
  let fixture: ComponentFixture<GetallprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallprogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
