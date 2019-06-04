import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accessories-tc',
  templateUrl: './accessories-tc.component.html',
  styleUrls: ['./accessories-tc.component.scss']
})
export class AccessoriesTcComponent implements OnInit {

  paramSystem: string;
  name: string;
  constructor(private route: ActivatedRoute, private title: Title, private _elementRef: ElementRef) { }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const domElement = this._elementRef.nativeElement.querySelector(`.side-list`);
    const distance = domElement.offsetTop;
    const stopElement = this._elementRef.nativeElement.querySelector(`app-footer-tc`).offsetTop;
    if (window.pageYOffset > distance) {
      const marginAdd = window.pageYOffset - distance;
      if (marginAdd < stopElement - distance - domElement.offsetHeight - 25) {
        domElement.style.transform = 'translateY(' + marginAdd + 'px)';
      }
    } else if (window.pageYOffset < domElement.offsetHeight) {
      domElement.style.transform = 'translateY(0)';
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.paramSystem = params['name'];
      if (params['name'] === 'all') {
        this.paramSystem = 'slg';
      }
    });
    this.title.setTitle('Designer Accessories ' + this.name + ' | Enjoybag HK');
  }
}
