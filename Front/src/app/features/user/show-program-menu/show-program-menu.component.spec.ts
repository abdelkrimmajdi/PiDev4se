import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramMenuComponent } from './show-program-menu.component';

describe('ShowProgramMenuComponent', () => {
  let component: ShowProgramMenuComponent;
  let fixture: ComponentFixture<ShowProgramMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProgramMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProgramMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
