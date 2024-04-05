import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetalleventComponent } from './getallevent.component';

describe('GetalleventComponent', () => {
  let component: GetalleventComponent;
  let fixture: ComponentFixture<GetalleventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetalleventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetalleventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
