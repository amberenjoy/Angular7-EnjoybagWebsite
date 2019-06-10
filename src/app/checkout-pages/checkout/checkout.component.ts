import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CartItemService } from '../../shared/services/cart-item.service';
import { CheckoutService } from '../../shared/services/checkout.service';
import { User } from './../../shared/models/user';
import { Order } from '../../shared/models/order';
import { Item } from '../../shared/models/item';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  shipForm: FormGroup;
  shipAddress = false;
  agreeTc = false;
  userCurrency: string;
  cartTotal: any;
  paypalLoad = false;
  paypalShow = false;
  paypalResult: boolean;
  paymentMessage = '';
  paymentStatus = '';
  user: User;
  delivery: number;
  logined: boolean;
  items: Item[] = [];
  order: Order = {
    id: '',
    status: '',
    orderItems: [],
    comment: '',
    billing: {
      username: '',
      email: '',
      phone: '',
      areacode: 0,
      building: '',
      street: '',
      district: '',
      region: ''
    },
    delivery: {
      deliveryMethod: '',
      status: '',
      date: ''
    },
    payment: {
      status: 'Unpaid',
      paymentMethod: '',
      transaction_id: ''
    },
    created_at: '',
    tax: 0,
    shipping: 0,
    bonus: 0,
    discount: '',
    subtotal: 0,
    total: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private cartService: CartItemService,
    private authenticationService: AuthenticationService,
    private checkoutService: CheckoutService,
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Do whatever you wish with the DOM element.
    const domElement = this.elementRef.nativeElement.querySelector(`.body-right`);
    const distance = domElement.offsetTop + domElement.offsetParent.offsetTop - 70;
    if ((window.pageYOffset || document.body.scrollTop) > distance) {
      const marginAdd = window.pageYOffset - distance;
      domElement.style.transform = 'translateY(' + marginAdd + 'px)';
    }
  }

  @HostListener('window:unload', ['$event'])  // when user change routes
  unloadHandler(event) {
    console.log('change route');
    localStorage.removeItem('cartToShipping');
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    return false;
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = (() => {
      return false;
    });
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    this.cartTotal = JSON.parse(localStorage.getItem('cartToShipping'));
    this.order.subtotal = this.cartTotal.subtotal;
    this.order.bonus = this.cartTotal.bonus;
    this.order.discount = this.cartTotal.discount;
    this.cartService.findUserCart().subscribe(res => {
      this.items = res;
    });
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
      } else {
        this.logined = false;
        this.router.navigate(['/en/register']);
      }
    });
    this.checkoutService.getShipping().subscribe(
      res => {
        this.user = res.data;
        this.initUserShipForm();
        if (res.anonymousId) {
          this.router.navigate([], { queryParams: { where: res.anonymousId } });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  initUserShipForm() {
    this.shipForm = this.formBuilder.group({
      delivery: this.formBuilder.group({
        deliveryMethod: ['', Validators.required]
      }),
      payment: this.formBuilder.group({
        paymentMethod: ['', [Validators.required]],
        transaction_id: ''
      }),
      billing: this.formBuilder.group({
        username: [this.user.username, [Validators.required]],
        lastname: [this.user.lastname],
        email: [this.user.email, [Validators.required, Validators.email]],
        areacode: [this.user.areacode, [Validators.required]],
        phone: [this.user.phone, [Validators.required]],
        region: [this.user.region],
        building: [this.user.address['building'.toString()]],
        street: [this.user.address['street'.toString()]],
        district: [this.user.address['district'.toString()]],
        city: [this.user.address['city'.toString()]],
      }),
      comment: ['']
    });
  }

  deliveryChange(entry): void {
    if (entry === true) {
      this.delivery = 0;
      this.shipForm.get('billing.building').clearValidators();
      this.shipForm.get('billing.street').clearValidators();
      this.shipForm.get('billing.district').clearValidators();
      this.shipForm.get('billing.city').clearValidators();
    } else {
      this.delivery = 30;
      this.shipForm.get('billing.building').setValidators([Validators.required]);
      this.shipForm.get('billing.street').setValidators([Validators.required]);
      this.shipForm.get('billing.district').setValidators([Validators.required]);
      this.shipForm.get('billing.city').setValidators([Validators.required]);
    }
  }

  paymentChange(entry): void {
    this.order.payment.paymentMethod = entry;
    if (entry === 'By Paypal') {
      this.paypalLoad = true;
      this.loadPaypal();
    } else {
      this.paypalLoad = false;
    }
  }

  orderTotal() {
    let ordertotal = 0;
    ordertotal = this.cartTotal.total + this.delivery;
    return ordertotal;
  }

  loadPaypal() {
    const itemAmount = this.cartTotal.subtotal;
    const shippingFee = this.delivery;
    const payAmount = this.orderTotal();
    const dis = this.cartTotal.subtotal - this.cartTotal.total;
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
    this.items.forEach((each) => {
      singleItem.name = each.product.name;
      singleItem.sku = JSON.stringify(each.product.sku);
      if (each.product.off) {
        singleItem.price = each.product.dis;
      } else {
        singleItem.price = each.product.price;
      }
      singleItem.quantity = JSON.stringify(each.qty);
      singleItem.unit_amount.value = singleItem.price;
      orderItems.push(singleItem);
      console.log(orderItems);
    });
    this.loadExternalScript(
      'https://www.paypal.com/sdk/js?client-id=AYQTo6YvxDFI5065dY1h7ycgwnSPTunZfEUYe2U1a-58I09ExZpAKZ-oI0eOadCM26_9w5NFswq5d_Nv&currency=HKD')
      .then(() => {
        paypal.Buttons({
          env: 'sandbox',
          style: {
            label: 'pay',
            size: 'medium',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'blue',      // gold | blue | silver | black
            tagline: false
          },
          commit: true,
          onClick: (e) => {
            this.paypalResult = true;
          },
          createOrder: (data, actions) => {
            // Set up the transaction
            return actions.order.create({
              purchase_units: [{
                description: 'Enjoybag HK',
                amount: {
                  value: payAmount, currency: 'HKD',
                  breakdown: {
                    item_total: { value: JSON.stringify(itemAmount), currency_code: 'HKD' },
                    shipping: { value: JSON.stringify(shippingFee), currency_code: 'HKD' },
                    discount: { value: JSON.stringify(dis), currency_code: 'HKD' }
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
              this.paypalResult = false;
              this.paymentStatus = 'Payment Success! ';
              this.paymentMessage = ' Transaction completed by' + details.payer.name.given_name
                + ' - Transaction ID:' + data.orderID;
              this.order.payment.transaction_id = data.orderID;
              this.order.payment.status = 'Paid';
            });
          },
          onError: (err) => {
            console.log('OnError', err);
            this.paypalResult = false;
            // payment faild please click paypal again
            this.paymentStatus = 'Ooops! Paypal failed to load. ';
            this.paymentMessage = 'Please click the paypal button again!';
          },
          onCancel: (data, actions) => {
            // Show a cancel page or return to cart
            console.log('canceled', actions);
            this.paypalResult = false;
            this.paymentStatus = 'Transaction Canceled!';
          }
        }).render('#paypal-button-container');
      }).then(() => {
        this.paypalShow = true;
      });
  }

  checkAgreeTc() {
    this.agreeTc = !this.agreeTc;
  }

  placeOrder() {
    if (this.shipForm.invalid) {
      return;
    }
    this.order.billing = this.shipForm.value.billing;
    this.order.comment = this.shipForm.value.comment;
    this.order.delivery = this.shipForm.value.delivery;
    this.order.shipping = this.delivery;
    this.order.total = this.orderTotal();
    this.order.created_at = new Date().toLocaleDateString();
    this.order.orderItems = this.items;
    if (this.logined) {
      this.checkoutService.placeOrder(this.order).subscribe(data => {
        this.cartService.completeOrder();
        localStorage.removeItem('cartToShipping');
        this.router.navigate(['en/checkout/track-order', data.orderID]);
      });
    } else {
      this.checkoutService.placeOrder(this.order).subscribe(res => {
        localStorage.removeItem('cartList');
        localStorage.removeItem('cartToShipping');
        this.router.navigate(['en/checkout/track-order', res.data.orderID],
          { queryParams: { where: res.anonymousId } }
        );
      });
    }
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
