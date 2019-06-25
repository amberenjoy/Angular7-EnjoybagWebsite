import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');

@Injectable({
  providedIn: 'root'
})
export class BaglistService {

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService, ) { }

  getBaglist(key, language, currency) {
    const bagNew = 'https://www.enjoybag.com.hk/wcapps/enjoywebsite.nsf/xmlv.xsp?key=' + key + '&lang=' + language + '&cur=' + currency;
    return this.http.get(bagNew, { headers, responseType: 'text' }).pipe(map(res => {
      console.log('get data from server');
      const parser = new DOMParser();
      const xml = parser.parseFromString(res, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      return obj['product'.toString()];
    }), retry(2), catchError(this.handleError));
  }
  getBagType(name, language, currency) {
    const bagType = 'https://www.enjoybag.com.hk/wcapps/enjoywebsite.nsf/xmlv.xsp?type=' + name + '&lang=' + language + '&cur=' + currency;
    return this.http.get(bagType, { headers, responseType: 'text' }).pipe(map(res => {
      console.log('get data from server');
      const parser = new DOMParser();
      const xml = parser.parseFromString(res, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      return obj['product'.toString()];
    }), retry(2), catchError(this.handleError));
  }
  getQuerylist(qry, language, currency) {
    const bagSearch = 'https://www.enjoybag.com.hk/wcapps/enjoywebsite.nsf/xmlv.xsp?search=' + qry + '&color=&stype=&lang=' + language +
      '&cur=' + currency;
    return this.http.get(bagSearch, { headers, responseType: 'text' }).pipe(
      map(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj['product'.toString()];
      }), retry(2), catchError(this.handleError));
  }
  getBag(sku, language, currency) {
    const bagDetail = 'https://www.enjoybag.com.hk/wcapps/enjoywebsite.nsf/xml.xsp?sku=' + sku + '&lang=' + language + '&cur=' + currency;
    const bagDetailfake = 'assets/data/333840056219.xml';
    return this.http.get(bagDetailfake, { headers, responseType: 'text' }).pipe(
      map(res => {
        console.log(res);
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
