import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SalesService } from '../sales.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-complete-payout',
  templateUrl: './complete-payout.component.html',
  styleUrls: ['./complete-payout.component.css']
})
export class CompletePayoutComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private dialogRef: MatDialogRef<CompletePayoutComponent>,
    private salesServ: SalesService,
    private matSnackBar: MatSnackBar,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.setListeners();
  }

  setListeners() {
    const pi = <HTMLInputElement>(document.getElementById('payment'));

    pi.addEventListener('input', ($e) => {
      if (parseInt(pi.value, 10) > this.injectedData.balance) {
        pi.value = this.injectedData.balance;
      }
    });
  }

  closeRef() {
    this.dialogRef.close();
  }

  tryPayingOut() {
    const pi = <HTMLInputElement>(document.getElementById('payment'));
    const val = parseInt(pi.value, 10);

    if (val <= 0) {
      this.dialogRef.close();
    } else {
      this.salesServ.updateBalance({
        total: parseInt(pi.value, 10) + this.injectedData.deposit,
        balance: pi.value,
        invoice_id: this.injectedData.invoice_id
      }).subscribe(res => {
        console.log(res);
        if (!(res.error)) {
          this.messages.changeMessage('invUpdated');
        }
        this.matSnackBar.open(res.message, 'close');
        this.dialogRef.close();
      });
    }
  }


}
