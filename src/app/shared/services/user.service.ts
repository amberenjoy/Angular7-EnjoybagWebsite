/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-08-28 16:10:23
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<any>(`${environment.apiUrl}/users/${user.id}/info`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  updateUserInfo(profile) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.put<any>(`${environment.apiUrl}/users/${user.id}/info`, profile, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserAddressHistory() {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<any>(`${environment.apiUrl}/users/${user.id}/address`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserAddressBook() {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<any>(`${environment.apiUrl}/addresses/${user.id}`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  updateUserAddress(addressId, address) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.put<any>(`${environment.apiUrl}/addresses/${addressId}`, address, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }


  addUserAddress(address) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post<any>(`${environment.apiUrl}/addresses/${user.id}`, address, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUserLevel(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get<any>(`${environment.apiUrl}/levels/${id}`, { headers }).pipe(map(
      res => {
        return res;
      }
    ));
  }
}