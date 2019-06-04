import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-tc',
  templateUrl: './contact-tc.component.html',
  styleUrls: ['./contact-tc.component.scss']
})
export class ContactTcComponent implements OnInit {
  contactForm: FormGroup;
  contactName: FormControl;
  contactEmail: FormControl;
  contactInfo: FormControl;
  constructor() {
  }
  createFormControls() {
    this.contactName = new FormControl('', Validators.required);
    this.contactEmail = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.contactInfo = new FormControl('', Validators.required);
  }
  createForm() {
    this.contactForm = new FormGroup({
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      contactInfo: this.contactInfo
    });
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
}
