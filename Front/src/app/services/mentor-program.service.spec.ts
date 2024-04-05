import { TestBed } from '@angular/core/testing';

import { MentorProgramService } from './mentor-program.service';

describe('MentorProgramService', () => {
  let service: MentorProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
