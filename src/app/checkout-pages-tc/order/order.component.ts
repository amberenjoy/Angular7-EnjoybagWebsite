import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Title } from '@angular/platform-browser';
import { Order } from '../../shared/models/order';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cancelModal = false;
  userCurrency: string;
  loading = true;
  print = false;
  error = false;
  reason = '';
  logined: boolean;
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
      date: '',
    },
    payment: {
      status: '',
      paymentMethod: '',
      transaction_id: ''
    },
    created_at: '',
    tax: 0,
    shipping: 0,
    subtotal: 0,
    bonus: 0,
    discount: '',
    total: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.userCurrency = localStorage.getItem('currency') || 'HKD';
    this.order.id = this.route.snapshot.paramMap.get('id');
    this.authenticationService.currentUser.subscribe(user => {
      if (user) {
        this.logined = true;
      } else {
        this.logined = false;
        this.router.navigate(['/tc/myEnjoybag']);
      }
    });
    this.route.queryParams.subscribe(query => {
      if (query.where) {
        this.orderService.getOrderByGuestId(this.order.id).subscribe(res => {
          this.order = res;
          console.log(this.order);
          this.order.orderItems = res.orderItems;
          this.loading = false;
          if (this.order.status === 'Placed Order') {
            this.title.setTitle('Place your order | Enjoybag HK');
          } else {
            this.title.setTitle('Complete your order | Enjoybag HK');
          }
        }, error => {
          this.error = true;
          this.loading = false;
        });
      } else {
        this.orderService.getOrderById(this.order.id).subscribe(res => {
          this.order = res;
          this.order.orderItems = res.orderItems;
          this.loading = false;
          if (this.order.status === 'Placed Order') {
            this.title.setTitle('Place your order | Enjoybag HK');
          } else {
            this.title.setTitle('Complete your order | Enjoybag HK');
          }
        }, error => {
          this.error = true;
          this.loading = false;
        });
      }
    });
  }

  reasonChange(entry): void {
    this.reason = entry;
  }

  cancelOrder(id) {
    console.log(this.reason);
    this.orderService.cancelOrder(id, this.reason).subscribe(res => {
      console.log(res);
      this.cancelModal = false;
    });
  }

  printInvoice() {
    this.print = true;
    setTimeout(() => {
      window.print();
      this.print = false;
    });
    // WindowPrt.print();
    // WindowPrt.close();
    // this.router.navigate(['tc/print-invoice', this.order.id]);
    // this.router.navigate([{ outlets: { invoice: null } }]);
  }
}
