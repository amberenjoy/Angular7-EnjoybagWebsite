import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTcComponent } from './faq-tc.component';

describe('FaqTcComponent', () => {
  let component: FaqTcComponent;
  let fixture: ComponentFixture<FaqTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
