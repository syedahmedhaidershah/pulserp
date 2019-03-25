import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryItemsInteractiveComponent } from '../inventory-items-interactive/inventory-items-interactive.component';
import { MatSelect, MatCheckbox, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-add-inv-item',
  templateUrl: './add-inv-item.component.html',
  styleUrls: ['./add-inv-item.component.css']
})
export class AddInvItemComponent implements OnInit {

  @ViewChild('itemTypeSelect') itemTypeSelect: MatSelect;

  @ViewChild('emptyCheck') matCheckBox: MatCheckbox;

  tempSub: Subscription;

  itemForm: FormGroup;

  selectedItemType = 'c';
  rentDurationType = null;
  hasEmpty = false;

  itemType = [
    { value: 'c', label: 'Consumer/Retail' },
    { value: 'r', label: 'Rental' }
  ];
  rentType = [
    { value: 'd', label: 'Daily' },
    { value: 'h', label: 'Hourly' },
    { value: 'm', label: 'Monthly' }
  ];

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private inventory: InventoryService, private messages: MessagesService) { }

  ngOnInit() {
    this.setAttr();
    this.setForms();
    this.setListeners();
  }

  setListeners() {
    this.matCheckBox._onInputClick = (e) => {
      if (!(this.hasEmpty)) {
        this.matCheckBox.writeValue('checked');
      } else {
        this.matCheckBox.writeValue(undefined);
      }
      this.hasEmpty = this.matCheckBox.checked;
    };
  }

  setForms() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      cost: [''],
      selling: [''],
      rent: ['']
    });
  }

  setAttr() {
    this.itemTypeSelect.value = 'c';
  }

  changeItemType(select) {
    this.selectedItemType = select.value;
    if (select.value === 'r') {
      $(document.getElementById('empty-container')).addClass('d-none');
    } else {
      $(document.getElementById('empty-container')).removeClass('d-none');
    }
  }

  changeRentDuration(select) {
    this.rentDurationType = select.value;
  }

  addItemToInventory() {
    const itemForm = this.itemForm;
    let forwardForm: any = {};
    let prevent = false;

    if (itemForm.valid) {
      if (this.selectedItemType === 'c') {
        if (itemForm.controls['cost'].value === '') {
          this.matSnackBar.open('Please enter a cost for the item', 'close');
          prevent = true;
        } else {
          forwardForm = itemForm.value;
          try {
            forwardForm['type'] = this.selectedItemType;
            delete forwardForm['rent'];
            delete forwardForm['rentDuration'];
          } catch (exc) {
            console.log(exc);
            prevent = true;
          }
        }
      } else if (this.selectedItemType === 'r') {
        if (itemForm.controls['rent'].value === '' || this.rentDurationType === null || itemForm.controls['rent'].value === null) {
          this.matSnackBar.open('Please enter rental details for the item', 'close');
          prevent = true;
        } else {
          forwardForm = itemForm.value;
          try {
            forwardForm['type'] = this.selectedItemType;
            forwardForm['rentDuration'] = this.rentDurationType;
            delete forwardForm['cost'];
          } catch (exc) {
            console.log(exc);
            prevent = true;
          }
        }
      }
      if (prevent) {
        this.matSnackBar.open('An unhandled error occured, please contact your administrator', 'close');
      } else {
        if (!(this.hasEmpty)) {
          forwardForm['empty'] = -1;
        } else {
          forwardForm['empty'] = forwardForm.quantity;
        }
        this.tempSub = this.inventory.addItemToInventory(forwardForm).subscribe(data => {
          if (!(data.error)) {
            this.itemForm.reset();
            this.messages.changeMessage('invUpdated');
          }
          this.matSnackBar.open(data.message, 'close');
          this.tempSub.unsubscribe();
        });
      }
    } else {
      this.matSnackBar.open('Please input all of the required fields', 'close');
    }
  }

}
