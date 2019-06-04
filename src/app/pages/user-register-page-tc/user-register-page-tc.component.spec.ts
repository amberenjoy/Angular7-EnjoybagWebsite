import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterPageTcComponent } from './user-register-page-tc.component';

describe('UserRegisterPageTcComponent', () => {
  let component: UserRegisterPageTcComponent;
  let fixture: ComponentFixture<UserRegisterPageTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterPageTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterPageTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
