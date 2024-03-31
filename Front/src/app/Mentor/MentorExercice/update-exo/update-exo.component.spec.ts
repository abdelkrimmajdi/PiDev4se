import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExoComponent } from './update-exo.component';

describe('UpdateExoComponent', () => {
  let component: UpdateExoComponent;
  let fixture: ComponentFixture<UpdateExoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
