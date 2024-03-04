import { TestBed } from '@angular/core/testing';

import { StyleLoaderService } from './style-loader.service';

describe('StyleLoaderService', () => {
  let service: StyleLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
