/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-10-11 14:47:44
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { BaglistService } from './baglist.service';
import { Item } from './../models/item';
import { Product } from './../models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartItemService {
    userCurrency: string;
    userLanguage: string;
    cart: Item[] = [];
    subjectUserCartCurrent = new BehaviorSubject([]);
    countUserCart = new BehaviorSubject(0);
    level: string;

    constructor(private dataService: BaglistService, private http: HttpClient) {
        this.userCurrency = localStorage.getItem('currency') || 'HKD';
        this.userLanguage = (localStorage.getItem('language') || 'EN').toUpperCase();
    }

    findUserCart() {
        const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
        this.cart = [];
        let cartArray = [];
        if (user.cartlist) {
            cartArray = user.cartlist.split('-');
        } else {
            const cartlist = localStorage.getItem('cartList') || '';
            cartArray = cartlist.split('-');
        }
        cartArray.shift();
        if (cartArray.length !== 0) {
            for (const cartSku of cartArray) {
                const item: Item = {
                    product: {
                        sku: cartSku.toString(),
                        name: '',
                        price: '',
                        dis: '',
                        off: '',
                        stock: 0,
                        color: ''
                    },
                    qty: 1
                };
                let index = -1;
                for (let a = 0; a < this.cart.length; a++) {
                    const thisBag = this.cart[a];
                    if (thisBag.product.sku === cartSku.toString()) {
                        index = a;
                        break;
                    }
                }
                if (index === -1) {
                    this.dataService.getBag(cartSku.toString(), this.userLanguage, this.userCurrency).subscribe(results => {
                        item['product'.toString()].name = results.productname;
                        item['product'.toString()].sku = cartSku.toString();
                        item['product'.toString()].price = results.price;
                        item['product'.toString()].dis = results.discountprice;
                        item['product'.toString()].off = results.discountpriceper;
                        item['product'.toString()].stock = results.StockQty;
                        item['product'.toString()].color = results.color;
                    });
                    this.cart.push(item);
                } else {
                    const thisBag = this.cart[index];
                    thisBag.qty += 1;
                    this.cart[index] = thisBag;
                }
            }
        }
        this.subjectUserCartCurrent.next(this.cart);
        // return this.subjectUserCartCurrent.asObservable();
    }
    getUserCart(): Observable<any> {
        return this.subjectUserCartCurrent.asObservable();
    }
    getCartQty(): Observable<number> {
        let count = 0;
        const user = Object.assign({}, JSON.parse(localStorage.getItem('user'))) || {};
        if (user.cartlist) {
            count = user.cartlist.split('-').length - 1;
        } else {
            const cartlist = localStorage.getItem('cartList') || '';
            count = cartlist.split('-').length - 1;
        }
        this.countUserCart.next(count);
        return this.countUserCart.asObservable();
    }
    addUserItem(bag, logined: boolean) {
        if (logined) {
            const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
            const cartlist = user.cartlist + '-' + bag;
            this.callCartApi(user, cartlist);
        } else {
            const guestCartList = localStorage.getItem('cartList') || '';
            const cartlist = guestCartList + '-' + bag;
            localStorage.setItem('cartList', cartlist);
            this.findUserCart();
            this.getCartQty();
        }
    }
    removeUserItem(bag, logined: boolean) {
        if (logined) {
            const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
            const usercart = user.cartlist || '';
            const skuArray = usercart.split('-');
            skuArray.splice(0, 1);
            const filtered = skuArray.filter(value => {
                return value !== bag;
            });
            user.cartlist = '';
            filtered.forEach(each => {
                user.cartlist = user.cartlist + '-' + each;
            });
            this.callCartApi(user, user.cartlist);
        } else {
            const guestCartList = localStorage.getItem('cartList') || '';
            const skuArray = guestCartList.split('-');
            skuArray.splice(0, 1);
            const filtered = skuArray.filter(value => {
                return value !== bag;
            });
            let cartlist = '';
            filtered.forEach(each => {
                cartlist = cartlist + '-' + each;
            });
            localStorage.setItem('cartList', cartlist);
            this.findUserCart();
            this.getCartQty();
        }

    }
    completeOrder() {
        const user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
        const cartlist = '';
        this.callCartApi(user, cartlist);
    }
    callCartApi(user, cartlist) {
        const id = user.id;
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.put<any>(`${environment.apiUrl}/users/${id}/cart`, { cartlist }, { headers }).subscribe(res => {
            this.level = res.level;
            user.cartlist = cartlist;
            localStorage.setItem('user', JSON.stringify(user));
            this.findUserCart();
            this.getCartQty();
        }, (err) => {
            console.log(err);
            this.subjectUserCartCurrent.next([]);
            this.countUserCart.next(0);
        });
    }
    removeCart() {
        this.subjectUserCartCurrent.next([]);
        this.countUserCart.next(0);
    }
}
