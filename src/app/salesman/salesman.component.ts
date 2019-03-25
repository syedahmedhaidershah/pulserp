import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../salesman.service';
import { MatSnackBar } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css']
})
export class SalesmanComponent implements OnInit {

  salesmenArr = [];

  constructor(
    private salesmen: SalesmanService,
    private matSnackBar: MatSnackBar,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(message => {
      if (message === 'salesmanUpdated') {
        this.retreiveSalesmen();
      }
    });
    this.retreiveSalesmen();
  }

  retreiveSalesmen() {
    this.salesmen.getAllSalesmen().subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
      } else {
        this.salesmenArr = res.message;
      }
    });
  }

}
