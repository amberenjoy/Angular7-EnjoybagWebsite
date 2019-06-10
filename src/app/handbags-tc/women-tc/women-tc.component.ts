import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-women-tc',
  templateUrl: './women-tc.component.html',
  styleUrls: ['./women-tc.component.scss']
})
export class WomenTcComponent implements OnInit {
  name: string;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private elementRef: ElementRef
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const domElement = this.elementRef.nativeElement.querySelector(`.side-list`);
    const distance = domElement.offsetTop;
    const stopElement = this.elementRef.nativeElement.querySelector(`.right-list`).offsetHeight +
      this.elementRef.nativeElement.querySelector(`.right-list`).offsetTop;

    if (window.pageYOffset > distance) {
      const marginAdd = window.pageYOffset - distance;
      if (marginAdd < stopElement - distance - domElement.offsetHeight) {
        domElement.style.transform = 'translateY(' + marginAdd + 'px)';
      }
    } else if (window.pageYOffset < domElement.offsetHeight) {
      domElement.style.transform = 'translateY(0)';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params.name;
      this.title.setTitle('Designer ' + this.name.charAt(0).toUpperCase() + this.name.slice(1) + ' for Women | Enjoybag HK');
    });
  }

}
