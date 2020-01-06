/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 10:57:11
 * @LastEditTime: 2019-10-18 14:57:47
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { Category } from '../models/category';
import { BehaviorSubject, Observable } from 'rxjs';

let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json; charset=UTF-8');

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoryWomenSubject = new BehaviorSubject<Category[]>([
    { name: 'Backpacks', chineseName: '背包', class: 'women' },
    { name: 'Bucket Bags', chineseName: '水桶袋', class: 'women' },
    { name: 'Crossbody Bags', chineseName: '斜背袋', class: 'women' },
    { name: 'Mini Bags', chineseName: '迷你包', class: 'women' },
    { name: 'Clutches', chineseName: '手拿包', class: 'women' },
    { name: 'Shoulder Bags', chineseName: '肩背包', class: 'women' },
    { name: 'Top Handles', chineseName: '單手柄袋', class: 'women' },
    { name: 'Totes', chineseName: '手挽袋', class: 'women' }
  ]);
  private categorySLGSubject = new BehaviorSubject<Category[]>([
    { name: 'Bag Accessories', chineseName: '手袋配件', class: 'slg' },
    { name: 'Belts', chineseName: '腰帶', class: 'slg' },
    { name: 'Bracelets', chineseName: '手鏈', class: 'slg' },
    { name: 'Card Holders', chineseName: '卡包', class: 'slg' },
    { name: 'Cosmetic Bags', chineseName: '化妝包', class: 'slg' },
    { name: 'Eyeglasses Cases', chineseName: '眼鏡盒', class: 'slg' },
    { name: 'Phone Cases', chineseName: '手機套', class: 'slg' },
    { name: 'Wallets', chineseName: '錢包', class: 'slg' }
  ]);

  constructor(private http: HttpClient) { }

  getBagCategories(className) {
    return this.http
      .get<Category[]>(`${environment.apiUrl}/categories/${className}`, {
        headers
      })
      .subscribe(res => {
        if (className === 'women') {
          this.categoryWomenSubject.next(res);
        } else {
          this.categorySLGSubject.next(res);
        }
      });
  }

  getCategories(): Observable<Category[]> {
    return this.categoryWomenSubject.asObservable();
  }

  getSLGCategories(): Observable<Category[]> {
    return this.categorySLGSubject.asObservable();
  }
}
