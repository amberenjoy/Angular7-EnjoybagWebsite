/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-09-25 16:06:41
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { CartItemService } from '../../shared/services/cart-item.service';
import { CheckoutService } from '../../shared/services/checkout.service';
import { User } from './../../shared/models/user';
import { Order } from '../../shared/models/order';
import { Item } from '../../shared/models/item';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userCurrency: string;
  shipForm: FormGroup;
  shipAddress = false;  // add new address
  defaultAddress: boolean;  // check if has default or previous address
  agreeTc = false;
  paymentObject = {
    paypalLoad: false,
    paymentMessage: '',
    paymentStatus: ''
  };
  logined: boolean;
  user: User;
  order: Order = {
    orderItems: [],
    comment: null,
    billing: {
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      areacode: null,
      oldAddress: null
    },
    address: {
      building: null,
      street: null,
      district: null,
      city: null
    },
    delivery: {
      deliveryMethod: null,
    },
    payment: {
      transaction_id: null,
      paymentMethod: null,
      paymentStatus: 'Unpaid'
    },
    subtotal: null,
    shipping: 0,
    bonus: null,
    discount: null,
    total: null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private title: Title,
    private cartService: CartItemService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private checkoutService: CheckoutService,
  ) { }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const domElement = this.elementRef.nativeElement.querySelector('.body-right');
    const distance = domElement.offsetTop + domElement.offsetParent.offsetTop - 70;
    if ((window.pageYOffset || document.body.scrollTop) > distance) {
      const marginAdd = window.pageYOffset - distance;
      domElement.style.transform = 'translateY(' + marginAdd + 'px)';
    }
  }

  @HostListener('window:unload', ['$event'])  // when user change routes
  unloadHandler(event) {
    localStorage.removeItem('cartToShipping');
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    return false;
  }

  ngOnInit() {
    this.title.setTitle('Complete shipping and payment information | Enjoybag HK');
    this.userCurrency = localStorage.getItem('currency') || 'HKD';

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    const cartTotal = JSON.parse(localStorage.getItem('cartToShipping'));
    localStorage.removeItem('cartToShipping'); // check if leave this page auto delete or need delete

    this.order.subtotal = cartTotal.subtotal;
    this.order.bonus = cartTotal.bonus;
    this.order.discount = cartTotal.discount;
    this.order.total = cartTotal.total;

    this.initShipForm();

    this.subscription = this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
        this.userService.getUserInfo().subscribe(res => {
          this.shipForm.controls['billing'.toString()].reset(res);
          if (res.oldAddress) {
            this.defaultAddress = true;
          }
        });
        this.userService.getUserAddressBook().subscribe(res => {
          this.shipForm.controls['address'.toString()].reset(res[0]);
        });
      } else {
        this.logined = false;
        this.route.queryParams.subscribe(param => {
          if (!param.client) {
            this.router.navigate(['../shopping-bag'], { relativeTo: this.route });
          }
        });
      }
    });

    this.cartService.getUserCart().subscribe(res => {
      this.order.orderItems = res;
    });

    this.formControlValueChanged();
    this.loadPaypal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDeactivate() {
    if (!this.order.id && this.logined) {
      return confirm('Do you want to leave? If you leave, you have to complete this form again.');
    } else {
      return true;
    }
  }

  initShipForm() {
    this.shipForm = this.formBuilder.group({
      deliveryMethod: ['Self Pick-Up', Validators.required],
      paymentMethod: [null, Validators.required],
      billing: this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        areacode: ['852', Validators.required],
        phone: ['', Validators.required],
        oldAddress: [null]
      }),
      address: this.formBuilder.group({
        building: [null],
        street: [null],
        district: [null],
        city: ['Hong Kong'],
      }),
      comment: [null]
    });
  }

  formControlValueChanged() {
    this.shipForm.get('deliveryMethod').valueChanges.subscribe((mode: string) => {
      if (mode === 'Standard Delivery') {
        this.order.shipping = 30;
        if (!this.defaultAddress) {
          this.shipForm.get('address.building').setValidators([Validators.required]);
          this.shipForm.get('address.street').setValidators([Validators.required]);
          this.shipForm.get('address.district').setValidators([Validators.required]);
          this.shipForm.get('address.city').setValidators([Validators.required]);
        }
      } else if (mode === 'Self Pick-Up') {
        this.order.shipping = 0;
        this.shipForm.get('address.building').clearValidators();
        this.shipForm.get('address.street').clearValidators();
        this.shipForm.get('address.district').clearValidators();
        this.shipForm.get('address.city').clearValidators();
      }
      this.order.total = this.order.total + this.order.shipping;
      this.shipForm.get('address.building').updateValueAndValidity();
      this.shipForm.get('address.street').updateValueAndValidity();
      this.shipForm.get('address.district').updateValueAndValidity();
      this.shipForm.get('address.city').updateValueAndValidity();
    });
  }

  onAddressChange() {
    this.shipAddress = !this.shipAddress;
    if (this.shipAddress) {
      this.shipForm.get('address.building').setValidators([Validators.required]);
      this.shipForm.get('address.street').setValidators([Validators.required]);
      this.shipForm.get('address.district').setValidators([Validators.required]);
      this.shipForm.get('address.city').setValidators([Validators.required]);
    } else {
      this.shipForm.get('address.building').clearValidators();
      this.shipForm.get('address.street').clearValidators();
      this.shipForm.get('address.district').clearValidators();
      this.shipForm.get('address.city').clearValidators();
    }
    this.shipForm.get('address.building').updateValueAndValidity();
    this.shipForm.get('address.street').updateValueAndValidity();
    this.shipForm.get('address.district').updateValueAndValidity();
    this.shipForm.get('address.city').updateValueAndValidity();
  }

  loadPaypal() {
    const orderItems = [];
    const singleItem = {
      name: '',
      sku: '',
      price: '',
      currency: '',
      unit_amount: {
        value: '', currency_code: 'HKD'
      },
      quantity: ''
    };

    this.order.orderItems.forEach((each) => {
      singleItem.name = each.product.name;
      singleItem.sku = JSON.stringify(each.product.sku);
      if (Number(each.product.dis) > 0) {
        singleItem.price = each.product.dis;
      } else {
        singleItem.price = each.product.price;
      }
      singleItem.quantity = JSON.stringify(each.qty);
      singleItem.unit_amount.value = singleItem.price;
      orderItems.push(singleItem);
    });
    // amber test paypal AYQTo6YvxDFI5065dY1h7ycgwnSPTunZfEUYe2U1a-58I09ExZpAKZ-oI0eOadCM26_9w5NFswq5d_Nv
    // tslint:disable-next-line:max-line-length
    this.loadExternalScript('https://www.paypal.com/sdk/js?client-id=Abs1qiSNKpkSUej7vbVd8vjY9pY1IOivR9qUUWkyNNinCXhQtCXczc6aJG0oGo4S-NhANCKKyXNYn95F&currency=HKD')
      .then(() => {
        console.log('load paypal');
        paypal.Buttons({
          env: 'sandbox',
          style: {
            label: 'pay',
            size: 'small',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'blue',      // gold | blue | silver | black
            tagline: false
          },
          commit: true,
          onClick: (e) => {
            this.paymentObject.paypalLoad = true;
            this.shipForm.get('paymentMethod').setValue('By Paypal');
            console.log('total', this.order);
          },
          createOrder: (data, actions) => {
            // Set up the transaction
            return actions.order.create({
              purchase_units: [{
                description: 'Enjoybag HK',
                amount: {
                  value: this.order.total, currency: 'HKD',
                  breakdown: {
                    item_total: { value: JSON.stringify(this.order.subtotal), currency_code: 'HKD' },
                    shipping: { value: JSON.stringify(this.order.shipping), currency_code: 'HKD' },
                    discount: { value: JSON.stringify(this.order.subtotal + this.order.shipping - this.order.total), currency_code: 'HKD' }
                  }
                },
                items: orderItems
              }]
            });
          },
          onApprove: (data, actions) => {
            // console.log('onApprove - transaction was approved, but not authorized', data, actions);
            // Authorize the transaction
            return actions.order.capture().then(details => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
              this.paymentObject.paypalLoad = false;
              this.paymentObject.paymentStatus = 'Paid Successfully !';
              this.paymentObject.paymentMessage = ' Transaction completed by ' + details.payer.name.given_name
                + ' - Transaction ID:' + data.orderID;
              if (data.orderID) {
                this.order.payment.transaction_id = data.orderID;
                this.order.payment.paymentStatus = 'Paid';
              }
            });
          },
          onError: (err) => {
            console.log('OnError', err);
            this.paymentObject.paypalLoad = false;
            // payment faild please click paypal again
            this.paymentObject.paymentStatus = 'Ooops! Paypal failed to load.';
            this.paymentObject.paymentMessage = 'Please click the paypal button again!';
          },
          onCancel: (data, actions) => {
            // Show a cancel page or return to cart
            this.paymentObject.paypalLoad = false;
            this.paymentObject.paymentStatus = 'Transaction Canceled !';
          }
        }).render('#paypal-button-container');
      });

  }

  placeOrder() {
    if (this.shipForm.invalid) {
      return;
    }

    this.order.billing = this.shipForm.value.billing;
    if (this.shipAddress) {
      this.order.address = this.shipForm.value.address;
    }
    this.order.comment = this.shipForm.value.comment;
    this.order.payment.paymentMethod = this.shipForm.value.paymentMethod;
    this.order.delivery.deliveryMethod = this.shipForm.value.deliveryMethod;

    this.checkoutService.placeOrder(this.order).subscribe(res => {
      if (this.logined) {
        this.cartService.completeOrder();
      } else {
        localStorage.removeItem('cartList');
      }
      this.order.id = res.id;
      this.router.navigate(['en/checkout/track-order', res.id]);
    });
  }

  loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

}
