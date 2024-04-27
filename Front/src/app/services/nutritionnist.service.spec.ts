import { TestBed } from '@angular/core/testing';

import { NutritionnistService } from './nutritionnist.service';

describe('NutritionnistService', () => {
  let service: NutritionnistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionnistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
