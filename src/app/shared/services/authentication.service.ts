/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-09-04 16:52:27
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  } // NgZone service to remove outside scope warning

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/users/auth`, { email, password }, httpOptions)
      .pipe(map(thisUser => {
        // login successful if there's a jwt token in the response
        if (thisUser && thisUser.token) {
          // store thisUser details and jwt token in local storage to keep thisUser logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(thisUser));
          this.currentUserSubject.next(thisUser);
          return thisUser;
        }
      }));
  }

  logout() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get(`${environment.apiUrl}/users/logout`, { headers })
      .subscribe(res => {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
      });
  }

  loginWithFB(accessToken) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    return this.http.get(`${environment.apiUrl}/auth/facebook`, { headers })
      .pipe(map(res => {
        // remove user from local storage to log user out
        return res;
      }));
  }
}
