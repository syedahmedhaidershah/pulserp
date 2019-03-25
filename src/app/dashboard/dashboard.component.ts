import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material';
import { MakeASaleDialogComponent } from '../make-a-sale-dialog/make-a-sale-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  maxHeight = '0px';
  dateFirst = null;
  dateToday = null;

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    this.setAttr();
  }

  setAttr() {
    this.maxHeight = (window.innerHeight - 74).toString().concat('px');

    const useDate = new Date();
    this.dateToday = useDate.toDateString();
    useDate.setDate(1);
    this.dateFirst = useDate.toDateString();
  }

  tryASell(str: String) {
    if (str === 's') {
      const dialogRef = this.matDialog.open(MakeASaleDialogComponent, {
        height: 'auto',
        width: '40%',
        panelClass: 'md-p-0'
      });
    } else if (str === 'r') {

    }
  }
}
