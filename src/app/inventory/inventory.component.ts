import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';
import { InventoryItemsInteractiveComponent } from '../inventory-items-interactive/inventory-items-interactive.component';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  tempSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private inventory: InventoryService) { }

  ngOnInit() {
  }

}
