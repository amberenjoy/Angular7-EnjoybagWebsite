/*
* @Description: In User Settings Edit
* @Author: your name
* @Date: 2019-09-23 15:18:06
 * @LastEditTime: 2019-10-11 17:21:44
 * @LastEditors: Please set LastEditors
*/
import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from './../../../shared/services/responsive.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-mobile-sidenav',
  templateUrl: './header-mobile-sidenav.component.html',
  styleUrls: ['./header-mobile-sidenav.component.scss']
})
export class HeaderMobileSidenavComponent implements OnInit {

  openSideNav: boolean;
  subNav: string;
  link: string;
  openSubSideNav: boolean;
  categories: Category[];
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private responsiveService: ResponsiveService
  ) { }


  ngOnInit() {
    this.responsiveService.getMobileSideStatus().subscribe(res => {
      this.openSideNav = res;
    });
  }
  openSubMenu(event) {
    console.log(event.target.innerText);
    this.subNav = event.target.innerText;
    this.openSubSideNav = true;
    if (this.subNav === 'WOMEN\'S') {
      this.link = 'women';
      this.categoriesService.getCategories().subscribe(res => {
        console.log('women', res);
        this.categories = res;
      });
    } else {
      this.link = 'accessories';

      this.categoriesService.getSLGCategories().subscribe(res => {
        console.log('acce', res);
        this.categories = res;
      });
    }
    this.categories.forEach(element => {
      element.name = element.name.toLowerCase();
      element.url = element.name.replace(' ', '-');
    });
  }
  toggleSideMenu() {
    this.responsiveService.listenMobileSide(this.openSideNav);
  }

  changeLanguage(language: string) {
    localStorage.setItem('language', language);
    if (language === 'en') {
      const newUrl = this.router.url.replace('/tc', '/en');
      // this.router.navigateByUrl(newUrl);
      window.location.href = newUrl;
    } else {
      const newUrl = this.router.url.replace('/en', '/tc');
      // this.router.navigateByUrl(newUrl);
      window.location.href = newUrl;
    }
  }
}