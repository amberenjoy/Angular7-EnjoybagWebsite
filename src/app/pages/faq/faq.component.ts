import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, AfterViewInit {
  fragment: any;
  infoStatus: Array<boolean> = [false, false, false, false, false];
  @ViewChild('contact', { static: false }) contactPart: ElementRef;
  constructor(
    private titleService: Title,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ | Enjoybag HK');
    this.router.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit() {
    try {
      if (this.fragment) {
        this.contactPart.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (e) { }
  }

}