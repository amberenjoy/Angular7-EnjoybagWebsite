/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-17 16:28:06
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { ResponsiveService } from './../../shared/services/responsive.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {
  name = 'all';
  categories: Category[];
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private elementRef: ElementRef,
    private categoriesService: CategoriesService,
    private responsiveService: ResponsiveService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // tslint:disable-next-line:max-line-length
    const domElement = this.elementRef.nativeElement.querySelector(
      `.side-list`
    );
    const distance = domElement.offsetTop;
    const stopElement =
      this.elementRef.nativeElement.querySelector(`.right-list`).offsetHeight +
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
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name').replace('-', ' ');
      this.title.setTitle(
        'Designer ' + this.name + ' for Women | Enjoy Handbag HK'
      );
    });
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
      this.categories.forEach(each => {
        each.url = each.name.replace(' ', '-');
      });
    });

    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
