import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private titleService: Title) {

    // subscribes every changes of your route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // scroll to top
        window.scrollTo(0, 0);
      }
    });

    this.titleService.setTitle('Enjoy Handbag Online Shopping HK ');
  }

}
