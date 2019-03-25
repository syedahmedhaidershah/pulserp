import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatInput } from '@angular/material';
import { InventoryService } from '../inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-re-stock-item',
  templateUrl: './re-stock-item.component.html',
  styleUrls: ['./re-stock-item.component.css']
})
export class ReStockItemComponent implements OnInit {
  @ViewChild('itemQuant') itemQuant: HTMLInputElement;

  item: any = null;

  restockForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private dialogRef: MatDialogRef<ReStockItemComponent>,
    private inventory: InventoryService,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setComponent();
    this.restockForm = this.fb.group({
      quantity: [0, Validators.required]
    });
  }

  setComponent() {
    this.inventory.getItem(this.injectedData).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
        this.dialogRef.close();
      } else {
        this.item = res.message[0];
      }
    });
  }

  reStock() {
    const forward = {
      itemId: this.injectedData.item_id,
      quantity: parseInt(this.restockForm.controls['quantity'].value, 10) + this.item.quantity
    };

    this.inventory.updateItemQuantity(forward).subscribe(res => {
      this.matSnackBar.open(res.message, 'close');
      this.dialogRef.close();
    });
  }

}
