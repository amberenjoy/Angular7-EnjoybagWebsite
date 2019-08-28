import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutEnterGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate() {
    const cartToCheckout = localStorage.getItem('cartToShipping');
    if (cartToCheckout) {
      // authorised so return true
      return true;
    }
    const userLanguage = localStorage.getItem('language') || 'en';
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/' + userLanguage + '/checkout/shopping-bag']);
    return false;
  }
}
