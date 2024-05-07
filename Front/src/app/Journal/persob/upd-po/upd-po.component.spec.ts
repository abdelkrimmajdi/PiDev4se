import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdPoComponent } from './upd-po.component';

describe('UpdPoComponent', () => {
  let component: UpdPoComponent;
  let fixture: ComponentFixture<UpdPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
