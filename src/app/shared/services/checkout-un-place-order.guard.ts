import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutComponent } from '../../checkout-pages/checkout/checkout.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutUnPlaceOrderGuard implements CanDeactivate<CheckoutComponent> {

  canDeactivate(
    component: CheckoutComponent
  ) {
    return false;
  }
}
