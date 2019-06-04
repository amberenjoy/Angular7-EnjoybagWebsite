import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartTcComponent } from './user-cart-tc.component';

describe('UserCartTcComponent', () => {
  let component: UserCartTcComponent;
  let fixture: ComponentFixture<UserCartTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
