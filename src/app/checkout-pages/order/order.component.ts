/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:13
 * @LastEditTime: 2019-10-10 17:04:30
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Title } from '@angular/platform-browser';
import { Order } from '../../shared/models/order';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  cancelModal = false;
  userCurrency: string;
  loading = true;
  print = false;
  error = false;
  reason = '';
  logined: boolean;
  order: Order = {
    id: null,
    status: null,
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
      deliveryStatus: null,
      dispatchedDate: null
    },
    payment: {
      paymentStatus: null,
      transaction_id: null,
      paymentMethod: null
    },
    tax: null,
    shipping: null,
    subtotal: null,
    bonus: null,
    discount: null,
    total: null
  };
  orderId: string;
  subscription: Subscription;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.title.setTitle('Complete your order | Enjoybag HK');
    this.userCurrency = localStorage.getItem('currency') || 'HKD';

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.orderId = this.route.snapshot.paramMap.get('id');
    this.subscription = this.authenticationService.currentUser.subscribe(
      user => {
        if (user) {
          this.logined = true;
          this.orderService.getUserOrderById(this.orderId).subscribe(
            res => {
              this.order = res;
              this.order.orderItems = res.orderItems;
              this.loading = false;
              console.log(this.order);
            },
            error => {
              this.error = true;
              this.loading = false;
            }
          );
        } else {
          this.logined = false;
          this.orderService.getGuestOrderById(this.orderId).subscribe(
            res => {
              this.order = res;
              this.order.orderItems = res.orderItems;
              this.loading = false;
            },
            error => {
              this.error = true;
              this.loading = false;
            }
          );
        }
      }
    );

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  reasonChange(entry): void {
    this.reason = entry;
  }

  cancelOrder(id) {
    if (this.logined) {
      this.orderService.cancelOrder(id, this.reason).subscribe(res => {
        this.cancelModal = false;
        this.router.navigate(['en/checkout/track-order', this.order.id], {
          queryParams: { action: 'canceled' }
        });
      });
    } else {
      this.orderService.cancelGuestOrder(id, this.reason).subscribe(res => {
        this.cancelModal = false;
        this.router.navigate(['en/checkout/track-order', this.order.id], {
          queryParams: { action: 'canceled' }
        });
      });
    }
  }

  printInvoice() {
    this.print = true;
    setTimeout(() => {
      window.print();
      this.print = false;
    });
  }
}
