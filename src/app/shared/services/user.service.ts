import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`/register`, user);
  }

  getUserInfo(uid) {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .append('Authorization', user.token);
    return this.http.get<any>(`/` + user.id + `/info`, { headers }).pipe(map(
      res => {
        return res.data;
      }
    ));
  }
}