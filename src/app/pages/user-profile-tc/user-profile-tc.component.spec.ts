import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTcComponent } from './user-profile-tc.component';

describe('UserProfileTcComponent', () => {
  let component: UserProfileTcComponent;
  let fixture: ComponentFixture<UserProfileTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
