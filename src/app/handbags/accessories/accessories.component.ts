/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-08-30 11:39:06
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  name: string;
  categories: Category[];

  constructor(
    private route: ActivatedRoute, private title: Title,
    private elementRef: ElementRef,
    private categoriesService: CategoriesService,
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const domElement = this.elementRef.nativeElement.querySelector(`.side-list`);
    const distance = domElement.offsetTop;
    const stopElement = this.elementRef.nativeElement.querySelector(`.right-list`).offsetHeight
      + this.elementRef.nativeElement.querySelector(`.right-list`).offsetTop;

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
      this.name = params['name'.toString()];
    });
    this.title.setTitle('Designer Accessories ' + this.name.charAt(0).toUpperCase() + this.name.slice(1) + ' | Enjoybag HK');
    this.categoriesService.getSLGCategories().subscribe(res => {
      this.categories = res;
      this.categories.forEach(each => {
        each.url = each.name.replace(' ', '-');
      });
    });
  }
}
