import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProgComponent } from './detail-prog.component';

describe('DetailProgComponent', () => {
  let component: DetailProgComponent;
  let fixture: ComponentFixture<DetailProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
