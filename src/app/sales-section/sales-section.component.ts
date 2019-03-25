import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MakeASaleDialogComponent } from '../make-a-sale-dialog/make-a-sale-dialog.component';
import { SelectorInterruptComponent } from '../selector-interrupt/selector-interrupt.component';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-sales-section',
  templateUrl: './sales-section.component.html',
  styleUrls: ['./sales-section.component.css']
})
export class SalesSectionComponent implements OnInit {

  AddItemHeading = 'Choose type of sale to Make';

  constructor(
    private matDialog: MatDialog,
    private salesServ: SalesService,
    private router: Router,
    private messages: MessagesService
  ) { }

  sales = {
    completed: {
      rentals: 0,
      consumer: 0,
      walkIn: 0,
      salesMan: 0,
      count: 0
    },
    inProgress: {
      rentals: 0,
      consumer: 0,
      walkIn: 0,
      salesMan: 0,
      count: 0
    }
  };

  ngOnInit() {
    this.messages.currentMessage.subscribe(m => {
      if (m === 'invUpdated') {
        this.retreiveInprogSales();
      }
    });
    this.retreiveInprogSales();
  }

  retreiveInprogSales() {
    this.salesServ.retreiveInProgressSales().subscribe(res => {
      const sales = res.message;
      this.sales.inProgress.count = sales.length;
      this.sales.inProgress.consumer = sales.map(x => {
        return x.deposit;
      }).reduce((total, num) => {
        return total + num;
      });
      this.sales.inProgress.walkIn = sales.map(x => {
        if (x.customer_id === 4) {
          return x.deposit;
        } else {
          return 0;
        }
      }).reduce((total, num) => {
        return total + num;
      });
      this.sales.inProgress.salesMan = sales.map(x => {
        if (x.customer_id !== 4) {
          return x.deposit;
        } else {
          return 0;
        }
      }).reduce((total, num) => {
        return total + num;
      });
    });
  }

  // makeASale() {
  //   const dialogRef = this.matDialog.open(MakeASaleDialogComponent, {
  //     height: 'auto',
  //     width: '30%',
  //     panelClass: 'md-p-0'
  //   });
  // }

  // tryMakingASale() {
  //   const dialogRef = this.matDialog.open(SelectorInterruptComponent, {
  //     height: 'auto',
  //     width: 'auto',
  //     data: {
  //       heading: this.AddItemHeading,
  //       options: [
  //         { label: 'Sell' },
  //         { label: 'Rent' }
  //       ]
  //     },
  //     panelClass: 'md-p-0'
  //   });

  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res === 'sell') {
  //       this.makeASale();
  //     } else if (res === 'rent') {

  //     }
  //   });
  // }

  navigateToSales() {
    this.router.navigate(['sales']);
  }

}
