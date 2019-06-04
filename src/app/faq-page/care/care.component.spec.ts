import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareComponent } from './care.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CareComponent', () => {
  let component: CareComponent;
  let fixture: ComponentFixture<CareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
