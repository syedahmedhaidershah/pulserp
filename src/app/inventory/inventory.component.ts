import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectModule, MatSnackBar, MatSelect } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild('itemTypeSelect') itemTypeSelect: MatSelect;

  tempSub: Subscription;

  selectedItemType = 'c';
  rentDurationType = null;

  itemType = [
    { value: 'c', label: 'Consumer/Retail' },
    { value: 'r', label: 'Rental' }
  ];
  rentType = [
    { value: 'd', label: 'Daily' },
    { value: 'h', label: 'Hourly' },
    { value: 'm', label: 'Monthly' }
  ];

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private inventory: InventoryService) { }

  ngOnInit() {
    this.setAttr();
    this.setForms();
  }

  setForms() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      cost: [''],
      rent: ['']
    });
  }

  setAttr() {
    this.itemTypeSelect.value = 'c';
  }

  changeItemType(select) {
    this.selectedItemType = select.value;
  }

  changeRentDuration(select) {
    this.rentDurationType = select.value;
  }

  addItemToInventory() {
    const itemForm = this.itemForm;
    let forwardForm = {};
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
        this.tempSub = this.inventory.addItemToInventory(forwardForm).subscribe(data => {
          this.matSnackBar.open(data.message, 'close');
          this.tempSub.unsubscribe();
        });
      }
    } else {
      this.matSnackBar.open('Please input all of the required fields', 'close');
    }
  }

}
