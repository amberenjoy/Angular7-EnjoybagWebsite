import { TestBed, async, inject } from '@angular/core/testing';

import { CheckoutUnPlaceOrderGuard } from './checkout-un-place-order.guard';

describe('CheckoutUnPlaceOrderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutUnPlaceOrderGuard]
    });
  });

  it('should ...', inject([CheckoutUnPlaceOrderGuard], (guard: CheckoutUnPlaceOrderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
