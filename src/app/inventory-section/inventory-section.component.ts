import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProcessConfirmComponent } from '../process-confirm/process-confirm.component';

@Component({
  selector: 'app-inventory-section',
  templateUrl: './inventory-section.component.html',
  styleUrls: ['./inventory-section.component.css']
})
export class InventorySectionComponent implements OnInit {

  tempSub: Subscription;

  inventoryStats = [
  ];

  delItemMessage = 'Are you sure you want to delete the Inventory item?';

  // tslint:disable-next-line:max-line-length
  constructor(private inventory: InventoryService, private matSnackBar: MatSnackBar, private router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
    this.retreiveInvItems();
  }

  retreiveInvItems() {
    this.tempSub = this.inventory.getAllItems().subscribe(data => {
      if (data.error) {
        this.matSnackBar.open(data.message, 'close');
      } else {
        this.inventoryStats = data.message;
      }
    });
  }

  capitalizeOnGaps(str: String) {
    const strArr = str.split(' ').map(e => {
      return e.substr(0, 1)
        .toUpperCase()
        .concat(
          e.substr(1) + ' '
        );
    });
    return strArr
      .toString()
      .replace(/,/g, ' ');
  }

  goToAddInventoryItem() {
    this.router.navigate(['inventory']);
  }

  deleteInventoryItem(itemId) {
    const dialogRef = this.matDialog.open(ProcessConfirmComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        message: this.delItemMessage,
        options: [
          { label: 'Yes', icon: 'done' },
          { label: 'No', icon: 'clear' }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        this.inventory.deleteItem({
          item_id: itemId
        }).subscribe(data => {
          if (!(data.error)) {
            this.retreiveInvItems();
          }
          this.matSnackBar.open(data.message, 'close');
        });
      }
    });

  }

}
