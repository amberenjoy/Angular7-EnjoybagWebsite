/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 14:58:31
 * @LastEditTime: 2019-09-24 10:32:48
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  isMobile = new BehaviorSubject<boolean>(false);
  screenWidth: string;
  openSideSubject = new Subject<boolean>();

  constructor() {
    this.checkWidth();
  }

  onMobileChange(status: boolean) {
    this.isMobile.next(status);
  }

  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  checkWidth() {
    const width = window.innerWidth;
    if (width <= 600) {
      this.screenWidth = 'xs';
      this.onMobileChange(true);
    } else if (width > 600 && width <= 960) {
      this.screenWidth = 'sm';
      this.onMobileChange(true);
    } else if (width > 960 && width <= 1280) {
      this.screenWidth = 'md';
      this.onMobileChange(false);
    } else {
      this.screenWidth = 'lg';
      this.onMobileChange(false);
    }
  }

  listenMobileSide(showSideMenu) {
    this.openSideSubject.next(showSideMenu);
  }

  getMobileSideStatus(): Observable<boolean> {
    return this.openSideSubject.asObservable();
  }

}
