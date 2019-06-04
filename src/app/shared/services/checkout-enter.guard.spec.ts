import { TestBed, async, inject } from '@angular/core/testing';

import { CheckoutEnterGuard } from './checkout-enter.guard';

describe('CheckoutEnterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutEnterGuard]
    });
  });

  it('should ...', inject([CheckoutEnterGuard], (guard: CheckoutEnterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
