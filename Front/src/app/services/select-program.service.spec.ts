import { TestBed } from '@angular/core/testing';

import { SelectProgramService } from './select-program.service';

describe('SelectProgramService', () => {
  let service: SelectProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
