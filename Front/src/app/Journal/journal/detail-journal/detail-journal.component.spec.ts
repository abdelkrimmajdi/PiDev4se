import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJournalComponent } from './detail-journal.component';

describe('DetailJournalComponent', () => {
  let component: DetailJournalComponent;
  let fixture: ComponentFixture<DetailJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
