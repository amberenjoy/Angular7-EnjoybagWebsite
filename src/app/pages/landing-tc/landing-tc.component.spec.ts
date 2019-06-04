import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTcComponent } from './landing-tc.component';

describe('LandingTcComponent', () => {
  let component: LandingTcComponent;
  let fixture: ComponentFixture<LandingTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
