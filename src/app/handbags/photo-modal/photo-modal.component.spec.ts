/*
 * @Author: your name
 * @Date: 2019-07-05 14:52:14
 * @LastEditTime: 2019-10-28 15:28:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Angular\enjoybag\src\app\handbags\photo-modal\photo-modal.component.spec.ts
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoModalComponent } from './photo-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('PhotoModalComponent', () => {
  let component: PhotoModalComponent;
  let fixture: ComponentFixture<PhotoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoModalComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
