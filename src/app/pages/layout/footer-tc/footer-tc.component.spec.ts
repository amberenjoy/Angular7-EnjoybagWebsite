import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTcComponent } from './footer-tc.component';

describe('FooterTcComponent', () => {
  let component: FooterTcComponent;
  let fixture: ComponentFixture<FooterTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
