import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterTcComponent } from './user-register-tc.component';

describe('UserRegisterTcComponent', () => {
  let component: UserRegisterTcComponent;
  let fixture: ComponentFixture<UserRegisterTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
