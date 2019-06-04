import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagListComponent } from './bag-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BagListComponent', () => {
  let component: BagListComponent;
  let fixture: ComponentFixture<BagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BagListComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
