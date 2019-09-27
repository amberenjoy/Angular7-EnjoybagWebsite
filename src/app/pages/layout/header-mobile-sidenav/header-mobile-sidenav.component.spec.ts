import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileSidenavComponent } from './header-mobile-sidenav.component';

describe('HeaderMobileSidenavComponent', () => {
  let component: HeaderMobileSidenavComponent;
  let fixture: ComponentFixture<HeaderMobileSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMobileSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMobileSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
