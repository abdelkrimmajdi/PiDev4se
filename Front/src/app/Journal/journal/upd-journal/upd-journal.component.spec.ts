import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdJournalComponent } from './upd-journal.component';

describe('UpdJournalComponent', () => {
  let component: UpdJournalComponent;
  let fixture: ComponentFixture<UpdJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
