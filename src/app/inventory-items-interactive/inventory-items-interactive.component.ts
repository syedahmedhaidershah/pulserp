import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProcessConfirmComponent } from '../process-confirm/process-confirm.component';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { EditInvItemComponent } from '../edit-inv-item/edit-inv-item.component';
import { MessagesService } from '../messages.service';
import { ReStockItemComponent } from '../re-stock-item/re-stock-item.component';

@Component({
  selector: 'app-inventory-items-interactive',
  templateUrl: './inventory-items-interactive.component.html',
  styleUrls: ['./inventory-items-interactive.component.css']
})

export class InventoryItemsInteractiveComponent implements OnInit {

  tempSub: Subscription;

  inventoryStats = [
  ];

  delItemMessage = 'Are you sure you want to delete the Inventory item?';

  // tslint:disable-next-line:max-line-length
  constructor(private inventory: InventoryService, private matSnackBar: MatSnackBar, private matDialog: MatDialog, private messages: MessagesService) { }

  initSubscribers() {
    this.messages.currentMessage.subscribe(message => {
      switch (message) {
        case 'invUpdated':
          this.retreiveInvItems();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.initSubscribers();
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

  editInventoryItem(itemId) {
    const dialogRef = this.matDialog.open(EditInvItemComponent, {
      height: 'auto',
      width: '30%',
      data: {
        item_id: itemId
      },
      panelClass: 'md-p-0'
    });
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

  reStock(itemId) {
    const dialogRef = this.matDialog.open(ReStockItemComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        item_id: itemId
      },
      panelClass: 'md-p-0'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.messages.changeMessage('invUpdated');
    });
  }

}
