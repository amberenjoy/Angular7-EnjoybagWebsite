import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

// array in local storage for registered users
const users = JSON.parse(localStorage.getItem('users')) || [];
const userTokenList = JSON.parse(localStorage.getItem('userTokenList')) || [];
const orders = JSON.parse(localStorage.getItem('orders')) || [];
const coupon = [
    {
        code: 'SALEAPRIL', amount: '-300', discount: '', limit: 500, validFrom: '20190401', validTo: '20190523',
        reused: -1, used: 1, users: []
    },
    {
        code: 'SALEMAY', amount: '', discount: '50%', limit: 1000, validFrom: '20190620', validTo: '20190702',
        reused: 1, used: 0, users: []
    },
];
localStorage.setItem('couponList', JSON.stringify(coupon));
const couponList = JSON.parse(localStorage.getItem('couponList')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/register') && method === 'POST':
                    return register();
                case url.endsWith('/authenticate') && method === 'POST':
                    return authenticate();
                case url.match(/[0-9A-Za-z]+\/info$/) && method === 'GET':
                    return getUserProfile();
                case url.match(/[0-9A-Za-z]+\/cart$/) && method === 'POST':
                    return updateUserCart();
                case url.match(/\/users\/[0-9A-Za-z]+\/shipping$/) && method === 'POST':
                    return getUserShipping();
                case url.match(/[0-9A-Za-z]+\/orders$/) && method === 'GET':
                    return getUserOrders();
                case url.match(/\/order\/[0-9A-Za-z]+$/) && method === 'GET':
                    return getOrderById();
                case url.endsWith('/orders') && method === 'POST':
                    return placeOrder();
                case url.match(/\/orders\/[0-9A-Za-z]+\/cancel$/) && method === 'POST':
                    return cancelOrder();
                case url.match(/\/code\/[0-9A-Za-z]+$/) && method === 'POST':
                    return getVoucher();
                case url.endsWith('/guest/shipping') && method === 'POST':
                    return getGuestShipping();
                case url.endsWith('/orders/guest') && method === 'POST':
                    return placeGuestOrder();
                case url.match(/\/order\/guest\/[0-9A-Za-z]+$/) && method === 'GET':
                    return getOrderByGuestId();
                case url.match(/\/orders\/[0-9A-Za-z]+\/cancel$/) && method === 'POST':
                    return cancelGuestOrder();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function register() {
            const user = body;

            if (users.find(x => x.email === user.email)) {
                return error('Username "' + user.username + '" is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            user.level = 'Basic';
            user.orders = [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
                return error('Username or password is incorrect');
            }
            const newToken = uuid();
            const userToken = user.id + '/' + newToken;
            userTokenList.push(userToken);
            localStorage.setItem('userTokenList', JSON.stringify(userTokenList));
            return ok({
                id: user.id,
                username: user.username,
                cartlist: user.cartlist,
                orders: user.orders,
                token: user.id + '/' + newToken
            });
        }

        function updateUserCart() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const req = body;
            const urlParts = request.url.split('/');
            const uid = parseInt(urlParts[urlParts.length - 2], 10);
            for (const user of users) {
                if (user.id === uid) {
                    user.cartlist = req.cartlist;
                }
            }
            localStorage.setItem('users', JSON.stringify(users));
            return ok({
                status: true
            });
        }

        function getUserShipping() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const urlParts = request.url.split('/');
            const uid = parseInt(urlParts[urlParts.length - 2], 10);
            const req = body;
            // check checkout items are valid or not
            if (!req.cartlist) {
                return error('Sorry, this item is invalid');
            }
            const user = users.find(x => x.id === uid);
            if (!user) {
                return error('You are not a member');
            }
            return ok({
                status: true,
                data: {
                    username: user.username,
                    lastname: user.lastname,
                    email: user.email,
                    areacode: user.areacode,
                    phone: user.phone,
                    region: user.region,
                    address: user.address,
                    cartlist: user.cartlist
                }
            });
        }
        function getGuestShipping() {
            const req = body;
            if (!req.cartlist) {
                return error('Sorry, this item is invalid');
            }
            return ok({
                status: true,
                data: {
                    username: '',
                    lastname: '',
                    email: '',
                    areacode: '',
                    phone: '',
                    region: '',
                    address: '',
                    cartlist: req.cartlist,
                },
                anonymousId: 'guestToken'
            });
        }
        function placeOrder() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const order = body.order;
            const userId = body.userId;
            order.id = uuid().slice(0, 6);
            order.status = 'Placed Order';
            order.uid = userId;
            orders.push(order);
            for (const user of users) {
                if (user.id === userId) {
                    user.orders.push(order.id);
                }
            }
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('orders', JSON.stringify(orders));
            return ok({
                data: {
                    type: 'order',
                    orderID: order.id,
                    orderStatus: order.status
                }
            });
        }
        function placeGuestOrder() {
            const order = body.order;
            order.id = uuid().slice(0, 6);
            order.status = 'Placed Order';
            order.uid = 'guest';
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            return ok({
                data: {
                    type: 'order',
                    orderID: order.id,
                    orderStatus: order.status
                },
                anonymousId: 'guestToken'
            });
        }
        function getOrderById() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const urlParts = request.url.split('/');
            const id = urlParts[urlParts.length - 1];
            const order = orders.find(x => x.id === id);
            if (!order) {
                return error('There is no order #' + id);
            }
            return ok({
                order: { order }
            });
        }
        function getOrderByGuestId() {
            const urlParts = request.url.split('/');
            const id = urlParts[urlParts.length - 1];
            const order = orders.find(x => x.id === id);
            if (!order) {
                return error('There is no order #' + id);
            }
            return ok({
                order,
                anonymousId: 'guestToken'
            });
        }
        function cancelOrder() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const id = body.orderId;
            const order = orders.find(x => x.id === id);
            if (!order) {
                return error('There is no order #' + id);
            }
            for (const orderEach of orders) {
                if (orderEach.id === id) {
                    orderEach.status = 'Cancelled';
                    orderEach.reason = body.reason;
                }
            }
            localStorage.setItem('orders', JSON.stringify(orders));
            return ok({
                executionStatus: 'Canceled'
            });
        }
        function cancelGuestOrder() {
            const id = body.orderId;
            const order = orders.find(x => x.id === id);
            if (!order) {
                return error('There is no order #' + id);
            }
            for (const orderEach of orders) {
                if (orderEach.id === id) {
                    orderEach.status = 'Cancelled';
                    orderEach.reason = body.reason;
                }
            }
            localStorage.setItem('orders', JSON.stringify(orders));
            return ok({
                executionStatus: 'Canceled',
                anonymousId: 'guestToken'
            });
        }
        function getUserProfile() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const urlParts = request.url.split('/');
            const id = parseInt(urlParts[urlParts.length - 2], 10);
            const user = users.find(x => x.id === id);
            return ok({
                status: true,
                data: user
            });
        }
        function getUserOrders() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            const urlParts = request.url.split('/');
            const id = parseInt(urlParts[urlParts.length - 2], 10);
            const orderlist = orders.filter(x => x.uid === id);
            return ok({
                orders: orderlist
            });
        }
        function getVoucher() {
            // if (!isLoggedIn()) {
            //     return unauthorized();
            // }
            const userID = body.id;
            const urlParts = request.url.split('/');
            const code = urlParts[urlParts.length - 1].toLocaleUpperCase();

            if (!couponList.find(x => x.code === code)) {
                return error('This code is invalid');
            }

            for (const couponEach of couponList) {
                if (couponEach.code === code) {
                    if (couponEach.users.indexOf(userID) > 0 && userID !== 0) {
                        return error('This code has been used by others');
                    }
                    couponEach.users.push(userID);
                    couponEach.used++;
                }
            }

            localStorage.setItem('couponList', JSON.stringify(couponList));
            const finalCoupon = couponList.find(x => x.code === code);
            return ok({
                status: true,
                data: {
                    code: finalCoupon.code,
                    amount: finalCoupon.amount,
                    discount: finalCoupon.discount,
                    limit: finalCoupon.limit,
                    validFrom: finalCoupon.validFrom,
                    validTo: finalCoupon.validTo
                }
            });
            //  amount: '', discount: '10%', limit: 1000, validFrom: '20190620', validTo: '20190702', reused: 1, used: 0, users: []
        }
        // helper functions
        function ok(bodyData?) {
            return of(new HttpResponse({ status: 200, body: bodyData }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const token = userTokenList.find(x => x === headers.get('Authorization'));
            if (!token) {
                return false;
            } else {
                return true;
            }
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
