import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
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
