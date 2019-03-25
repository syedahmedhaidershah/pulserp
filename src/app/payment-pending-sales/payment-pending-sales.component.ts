import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MessagesService } from '../messages.service';
import { CompletePayoutComponent } from '../complete-payout/complete-payout.component';

@Component({
  selector: 'app-payment-pending-sales',
  templateUrl: './payment-pending-sales.component.html',
  styleUrls: ['./payment-pending-sales.component.css']
})
export class PaymentPendingSalesComponent implements OnInit {

  inProgress: any = [];

  constructor(
    private salesServ: SalesService,
    private matSnack: MatSnackBar,
    private messages: MessagesService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(res => {
      if(res === 'invUpdated') {
        this.retreiveSales();
      }
    });
    this.retreiveSales();
  }

  retreiveSales() {
    this.salesServ.retreiveInProgressComplete().subscribe(res => {
      if(res.error) {
        this.matSnack.open(res.message, 'close');
      } else {
        this.inProgress = res.message;
      }
    });
  }

  proceedToPayout(iid) {
    const dialogRef = this.matDialog.open(CompletePayoutComponent, {
      height: 'auto',
      width: 'auto',
      panelClass: 'md-p-0',
      data: iid
    });
  }

}
