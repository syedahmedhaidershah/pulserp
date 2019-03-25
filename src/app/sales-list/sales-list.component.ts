import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  salesList = [];

  constructor(
    private salesServ: SalesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.retreiveSales();
  }

  retreiveSales() {
    this.salesServ.getAllSales().subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message, 'close');
      } else {
        this.salesList = res.message;
      }
    });
  }

  Date(str) {
    return new Date(str).toLocaleString();
  }

  payOut(id, dep) {
    // const dialogRef = this.mat
  }

}
