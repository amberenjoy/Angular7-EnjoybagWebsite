/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-03 10:51:59
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json; charset=UTF-8');

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUserLevelSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getUserInfo(uid) {
    return this.http.get<any>(`${environment.apiUrl}/users/${uid}/info`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  updateUserInfo(profile) {
    const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
    return this.http.put<any>(`${environment.apiUrl}/users/${user.id}/info`, profile, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserAddressHistory() {
    const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
    return this.http.get<any>(`${environment.apiUrl}/users/${user.id}/address`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserAddressBook() {
    const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
    return this.http.get<any>(`${environment.apiUrl}/addresses/${user.id}`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  updateUserAddress(addressId, address) {
    return this.http.put<any>(`${environment.apiUrl}/addresses/${addressId}`, address, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }


  addUserAddress(address) {
    const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
    return this.http.post<any>(`${environment.apiUrl}/addresses/${user.id}`, address, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserLevel(id) {
    return this.http.get<any>(`${environment.apiUrl}/levels/${id}`, { headers }).subscribe(
      res => {
        this.currentUserLevelSubject.next(res);
      });
  }

  currentLevelValue(): Observable<any> {
    return this.currentUserLevelSubject.asObservable();
  }

  sendComment(comment) {
    return this.http.post<any>(`${environment.apiUrl}/comments`, comment, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  forgotPassword(email) {
    return this.http.post<any>(`${environment.apiUrl}/password/forgotPassword`, email, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }
  resetPasswordLink(token) {
    return this.http.get<any>(`${environment.apiUrl}/password/reset-link`, {
      headers,
      params: {
        resetPasswordToken: token
      }
    }).pipe(map(
      res => {
        return res;
      }
    ));
  }
  updatePasswordViaEmail(user) {
    return this.http.post<any>(`${environment.apiUrl}/password/updatePassword`, user, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }
}