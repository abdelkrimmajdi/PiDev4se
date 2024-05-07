import { TestBed } from '@angular/core/testing';

import { FavoriteMealService } from './favorite-meal.service';

describe('FavoriteMealService', () => {
  let service: FavoriteMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
