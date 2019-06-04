import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchItem: string;
  searchForm: FormGroup;
  searchName: FormControl;
  constructor(private router: Router) {
  }
  createFormControls() {
    this.searchName = new FormControl('', Validators.required);
  }
  createForm() {
    this.searchForm = new FormGroup({
      searchName: this.searchName
    });
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  searchKey(event, value) {
    if (event.keyCode === 13) {
      this.searchBtn(event, value);
    }
  }

  searchBtn(event, value) {
    event.preventDefault();
    if (value !== '') {
      // 重复点击菜单刷新界面 网上没找到方法 通过跳转到别的界面在跳回来的方式进行实现
      this.router.navigateByUrl('/en/home').then(() => {
        this.router.navigate(['/en/products/search'], { queryParams: { qry: value } });
      });
    } else {
      this.searchForm.controls['email'].setErrors({ 'incorrect': true });
    }
  }
}
