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
  order: Order;

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

  }

  reasonChange(entry): void {
    this.reason = entry;
  }

  cancelOrder(id) {
    this.orderService.cancelOrder(id, this.reason).subscribe(res => {
      console.log(res);
      this.cancelModal = false;
      this.router.navigate(['tc/track-order', this.order.id]);
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
