import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderById(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .append('Authorization', user.token);
    return this.http.get<any>(`/order/` + id, { headers }).pipe(map(
      res => {
        console.log(res.order);
        return res.order;
      }
    ));
  }
  getOrderByGuestId(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.get<any>(`/order/guest/` + id, { headers }).pipe(map(
      res => {
        return res.order;
      }
    ));
  }
  cancelOrder(orderId, reason) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .append('Authorization', user.token);
    return this.http.post<any>(`/orders/` + orderId + `/cancel`, { orderId, reason }, { headers }).pipe(map(res => {
      return res.executionStatus;
    }));
  }
  cancelGuestOrder(orderId, reason) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post<any>(`/orders/guest` + orderId + `/cancel`, { orderId, reason }, { headers }).pipe(map(res => {
      return res.executionStatus;
    }));
  }
  getUserOrders() {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .append('Authorization', user.token);
    return this.http.get<any>(user.id + `/orders`, { headers }).pipe(map(orderlist => {
      return orderlist;
    }));
  }
}
