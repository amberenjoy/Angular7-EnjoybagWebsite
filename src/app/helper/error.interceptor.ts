/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-08-12 12:57:09
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ModalService } from '../shared/services/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private modalService: ModalService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.modalService.closeModal();
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.modalService.openInfoModal();
                this.authenticationService.logout();
            } else if (err.status === 500) {
                this.modalService.openErrorModal();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}