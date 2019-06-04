import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginTcComponent } from './user-login-tc.component';

describe('UserLoginTcComponent', () => {
  let component: UserLoginTcComponent;
  let fixture: ComponentFixture<UserLoginTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
