import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from './../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  userLanguage: string;
  private orderQtySubject = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.userLanguage = (localStorage.getItem('language') || '').toUpperCase();
  }

  getVoucher(code) {
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const id = user.id || 0;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .append('Authorization', user.token);
    return this.http.post<any>(`/code/` + code, { id }, { headers }).pipe(map(
      res => {
        return res;
      })
    );
  }

  getShipping() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const cartlist = user.cartlist;
      const id = user.id;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .append('Authorization', user.token);
      return this.http.post<any>(`/users/` + id + `/shipping`, { cartlist }, { headers }).pipe(map(
        res => {
          return res;
        })
      );
    } else {
      const cartlist = localStorage.getItem('cartList');
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      return this.http.post<any>(`/guest/shipping`, { cartlist }, { headers }).pipe(map(
        res => {
          return res;
        })
      );
    }

  }

  getOrderQty() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.orderQtySubject.next(user.orders);
    return this.orderQtySubject.asObservable();
  }

  placeOrder(order) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const userId = user.id;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .append('Authorization', user.token);
      return this.http.post<any>(`/orders`, { order, userId }, { headers }).pipe(map(
        res => {
          user.orders.push(res.data.orderID);
          localStorage.setItem('user', JSON.stringify(user));
          this.orderQtySubject.next(user.orders);
          return res.data;
        }
      ));
    } else {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      return this.http.post<any>(`/orders/guest`, { order }, { headers }).pipe(map(
        res => {
          return res;
        }
      ));
    }
  }
}
