/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-08-12 12:58:17
 * @LastEditors: Please set LastEditors
 */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../pages/layout/dialog/dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  openInfoModal() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Your session has expired.',
        requireLogin: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout');
      // this.router.navigateByUrl('/en/register');
    });
  }
  openWarningModal() { }
  openErrorModal() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Something went wrong, please try again.',
        requireLogin: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openConfirmModal() { }

  closeModal() {
    this.dialog.closeAll();
  }

}