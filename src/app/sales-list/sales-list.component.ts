import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  fieldEnabled = false;
  salesList = [];

  constructor(
    private salesServ: SalesService,
    private snackBar: MatSnackBar,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(res => {
      if (res === 'invUpdated') {
        this.retreiveSales();
      }
    });
    this.retreiveSales();
  }

  retreiveSales() {
    this.salesServ.getAllSales().subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message, 'close');
      } else {
        this.salesList = res.message.map(x => {
          x['fieldEnabled'] = false;
          return x;
        });
      }
    });
  }

  Date(str) {
    return new Date(str).toLocaleString();
  }

  payOut(id, dep) {
    // const dialogRef = this.mat
  }

  close(id) {
    
  }

}
