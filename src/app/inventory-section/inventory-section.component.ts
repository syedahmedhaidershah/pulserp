import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-inventory-section',
  templateUrl: './inventory-section.component.html',
  styleUrls: ['./inventory-section.component.css']
})
export class InventorySectionComponent implements OnInit {

  tempSub: Subscription;

  inventoryStats = [
  ];

  constructor(private inventory: InventoryService, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
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

}
