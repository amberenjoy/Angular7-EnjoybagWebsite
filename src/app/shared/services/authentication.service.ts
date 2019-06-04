import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { CartItemService } from './cart-item.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any; // Save logged in user data
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private cartItemService: CartItemService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  } // NgZone service to remove outside scope warning

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`/authenticate`, { username, password }, httpOptions)
      .pipe(map(thisUser => {
        // login successful if there's a jwt token in the response
        if (thisUser && thisUser.token) {
          // store thisUser details and jwt token in local storage to keep thisUser logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(thisUser));

          localStorage.setItem('user', JSON.stringify(thisUser));
          this.currentUserSubject.next(thisUser);
          return thisUser;
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

}
