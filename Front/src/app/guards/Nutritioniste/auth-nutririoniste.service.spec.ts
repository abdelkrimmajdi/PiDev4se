import { TestBed } from '@angular/core/testing';

import { AuthNutririonisteService } from './auth-nutririoniste.service';

describe('AuthNutririonisteService', () => {
  let service: AuthNutririonisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthNutririonisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
