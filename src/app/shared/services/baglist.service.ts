/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-09-27 14:48:58
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

@Injectable({
  providedIn: 'root'
})

export class BaglistService {

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService, ) { }

  getBaglist(key, language, currency) {
    return this.http.get(`${environment.apiUrl}/products/lines/${key}`, {
      headers, responseType: 'text',
      params: {
        lan: language,
        cur: currency
      }
    }).pipe(
      map(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj['product'.toString()];
      }), retry(2), catchError(this.handleError));
  }

  getBagType(name, language, currency) {
    return this.http.get(`${environment.apiUrl}/products/types/${name}`, {
      headers, responseType: 'text',
      params: {
        lan: language,
        cur: currency
      }
    }).pipe(
      map(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj['product'.toString()];
      }), retry(2), catchError(this.handleError));
  }

  getQuerylist(qry, language, currency) {
    return this.http.get(`${environment.apiUrl}/products/search/${qry}`, {
      headers, responseType: 'text',
      params: {
        lan: language,
        cur: currency
      }
    }).pipe(
      map(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj['product'.toString()];
      }), retry(2), catchError(this.handleError));
  }

  getBag(sku, language, currency) {
    return this.http.get(`${environment.apiUrl}/products/${sku}`, {
      headers, responseType: 'text',
      params: {
        lan: language,
        cur: currency
      }
    }).pipe(
      map(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj['product'.toString()];
      }), retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
