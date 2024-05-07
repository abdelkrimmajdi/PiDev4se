import { TestBed } from '@angular/core/testing';

import { CartmealService } from './cartmeal.service';

describe('CartmealService', () => {
  let service: CartmealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartmealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
