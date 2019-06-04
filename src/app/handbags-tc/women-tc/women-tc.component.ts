import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-women-tc',
  templateUrl: './women-tc.component.html',
  styleUrls: ['./women-tc.component.scss']
})
export class WomenTcComponent implements OnInit {
  paramSystem: string;
  name: string;
  constructor(private route: ActivatedRoute, private title: Title, private _elementRef: ElementRef) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const domElement = this._elementRef.nativeElement.querySelector(`.side-list`);
    const distance = domElement.offsetTop;
    if (window.pageYOffset > distance) {
      const marginAdd = window.pageYOffset - distance;
      domElement.style.transform = 'translateY(' + marginAdd + 'px)';
    } else {
      domElement.style.transform = 'translateY(0)';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.paramSystem = params['name'];
      if (params['name'] === 'all') {
        this.paramSystem = 'women';
      }
    });
    console.log(this.name);
    this.title.setTitle('Designer ' + this.name + ' for Women | Enjoybag HK');
  }
}
