import { TestBed } from '@angular/core/testing';

import { SchemesService } from './schemes.service';

describe('SchemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchemesService = TestBed.get(SchemesService);
    expect(service).toBeTruthy();
  });
});
