import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTcComponent } from './contact-tc.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactTcComponent', () => {
  let component: ContactTcComponent;
  let fixture: ComponentFixture<ContactTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactTcComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
