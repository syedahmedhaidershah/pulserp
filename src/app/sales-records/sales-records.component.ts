import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddSalesmanComponent } from '../add-salesman/add-salesman.component';
import { AddSchemeComponent } from '../add-scheme/add-scheme.component';

@Component({
  selector: 'app-sales-records',
  templateUrl: './sales-records.component.html',
  styleUrls: ['./sales-records.component.css']
})
export class SalesRecordsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addSalesman() {
    const dialogRef = this.dialog.open(AddSalesmanComponent, {
      height: 'auto',
      width: '40%',
      panelClass: 'md-p-0'
    });
  }

  addScheme() {
    const dialogRef = this.dialog.open(AddSchemeComponent, {
      height: 'auto',
      width: '40%',
      panelClass: 'md-p-0'
    });
  }

}
