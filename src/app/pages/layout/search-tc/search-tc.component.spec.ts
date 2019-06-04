import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTcComponent } from './search-tc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SearchTcComponent', () => {
  let component: SearchTcComponent;
  let fixture: ComponentFixture<SearchTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTcComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
