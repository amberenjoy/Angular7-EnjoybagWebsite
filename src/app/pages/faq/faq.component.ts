/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:15
 * @LastEditTime: 2019-10-14 16:29:12
 * @LastEditors: Please set LastEditors
 */
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
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
  isMobile: boolean;

  @ViewChild('contact', { static: false }) contactPart: ElementRef;
  constructor(
    private titleService: Title,
    private router: ActivatedRoute,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAQ | Enjoy Handbag HK');
    this.router.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngAfterViewInit() {
    try {
      if (this.fragment) {
        this.contactPart.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (e) { }
  }

}