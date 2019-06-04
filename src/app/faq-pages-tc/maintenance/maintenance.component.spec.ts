import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceComponent } from './maintenance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
