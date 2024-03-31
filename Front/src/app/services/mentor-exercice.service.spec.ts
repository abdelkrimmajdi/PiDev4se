import { TestBed } from '@angular/core/testing';

import { MentorExerciceService } from './mentor-exercice.service';

describe('MentorExerciceService', () => {
  let service: MentorExerciceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorExerciceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
