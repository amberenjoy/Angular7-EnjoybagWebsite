/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 12:22:21
 * @LastEditTime: 2019-10-25 11:07:17
 * @LastEditors: Please set LastEditors
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title: string;
  requireLogin: boolean;
  faTimes = faTimes;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.requireLogin = data.requireLogin;
    this.title = data.title;
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
