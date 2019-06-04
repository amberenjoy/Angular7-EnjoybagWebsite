import { TestBed } from '@angular/core/testing';

import { BaglistService } from './baglist.service';

describe('BaglistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaglistService = TestBed.get(BaglistService);
    expect(service).toBeTruthy();
  });
});
