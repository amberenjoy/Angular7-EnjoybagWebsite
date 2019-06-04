import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTcComponent } from './index-tc.component';

describe('IndexTcComponent', () => {
  let component: IndexTcComponent;
  let fixture: ComponentFixture<IndexTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
