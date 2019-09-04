/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-09-03 16:33:23
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

  openInfoModal(err) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: err.error.message || 'Your session has expired.',
        requireLogin: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout');
      // this.router.navigateByUrl('/en/register');
    });
  }

  openErrorModal(err) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: err.error.message,
        requireLogin: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  closeModal() {
    this.dialog.closeAll();
  }

}