import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getUserOrderById(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<Order>(`${environment.apiUrl}/orders/${user.id}/${id}`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }
  getGuestOrderById(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<Order>(`${environment.apiUrl}/orders/guest/${id}`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }
  cancelOrder(orderId, reason) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.put<any>(`${environment.apiUrl}/orders/${user.id}/${orderId}`, { action: 'Canceled', info: reason }, { headers })
      .pipe(map(res => {
        return res.message;
      }));
  }
  cancelGuestOrder(orderId, reason) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.put<any>(`${environment.apiUrl}/orders/guest/${orderId}`, { action: 'Canceled', info: reason }, { headers })
      .pipe(map(res => {
        return res.message;
      }));
  }
  getUserOrders() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<any>(`${environment.apiUrl}/users/${id}/orders`, { headers }).pipe(map(res => {
      return res;
    }));
  }
}
