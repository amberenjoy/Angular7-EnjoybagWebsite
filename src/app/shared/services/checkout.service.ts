/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-08-19 16:15:39
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from './../models/user';
import { Order } from '../models/order';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  userLanguage: string;
  private orderQtySubject = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.userLanguage = (localStorage.getItem('language') || '').toUpperCase();
  }

  verifyCode(code, amountTotal) {
    const uid = JSON.parse(localStorage.getItem('user')).id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post<any>(`${environment.apiUrl}/coupons/${code}`, { uid, amountTotal }, { headers }).pipe(
      map(res => {
        return res;
      })
    );
  }

  checkProduct() {
    const user = JSON.parse(localStorage.getItem('user'));
    const cartlist = user.cartlist;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post<any>(`${environment.apiUrl}/products`, { cartlist }, { headers }).pipe(map(
      res => {
        return res;
      })
    );
  }

  getOrderQty() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.orderQtySubject.next(user.orders);
    return this.orderQtySubject.asObservable();
  }

  placeOrder(order) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const id = user.id;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
      return this.http.post<Order>(`${environment.apiUrl}/orders/user`, { id, order }, { headers }).pipe(map(
        res => {
          user.orders.push(res.id);
          localStorage.setItem('user', JSON.stringify(user));
          this.orderQtySubject.next(user.orders);
          return res;
        }
      ));
    } else {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
      return this.http.post<Order>(`${environment.apiUrl}/orders/guest`, { order }, { headers }).pipe(map(
        res => {
          return res;
        }
      ));
    }
  }
}
