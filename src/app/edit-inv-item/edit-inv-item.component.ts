import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect, MatCheckbox, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-edit-inv-item',
  templateUrl: './edit-inv-item.component.html',
  styleUrls: ['./edit-inv-item.component.css']
})
export class EditInvItemComponent implements OnInit {

  @ViewChild('itemTypeSelect') itemTypeSelect: MatSelect;

  @ViewChild('emptyCheck2') matCheckBox: MatCheckbox;

  @ViewChild('rentDurationSelect') rentalTypeSelect: MatSelect;

  tempSub: Subscription;

  editButInactive = true;

  selectedItemType = 'c';
  rentDurationType = null;
  hasEmpty = false;

  isRental = false;

  itemType = [
    { value: 'c', label: 'Consumer/Retail' },
    { value: 'r', label: 'Rental' }
  ];
  rentType = [
    { value: 'd', label: 'Daily' },
    { value: 'h', label: 'Hourly' },
    { value: 'm', label: 'Monthly' }
  ];

  editItemForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private inventory: InventoryService, private messages: MessagesService,
    @Inject(MAT_DIALOG_DATA) public injectedData: Object,
    private dialogRef: MatDialogRef<EditInvItemComponent>,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.setForms();
    this.retreiveInvItem();
    this.setListeners();
  }

  retreiveInvItem() {
    this.inventory.getItem(this.injectedData).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
        this.dialogRef.close();
      } else {
        this.editButInactive = false;
        const response = res.message[0];

        this.editItemForm.controls['name'].setValue(response.name);
        this.editItemForm.controls['quantity'].setValue(response.quantity);

        if (response.empty >= 0) {
          this.matCheckBox.writeValue('checked');
        } else {
          this.matCheckBox.writeValue(undefined);
        }

        this.hasEmpty = this.matCheckBox.checked;

        if (response.consumer > 0) {
          this.selectedItemType = 'c';
          this.itemTypeSelect.writeValue('c');

          this.changeDetector.detectChanges();

          this.editItemForm.controls['cost'].setValue(response.cost);
          this.editItemForm.controls['selling'].setValue(response.selling);
        } else {

          this.selectedItemType = 'r';
          this.itemTypeSelect.writeValue('r');

          this.changeDetector.detectChanges();

          this.editItemForm.controls['rent'].setValue(response.cost);

          this.isRental = true;
        }

      }
    });
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

  changeItemType(select) {
    this.selectedItemType = select.value;
  }

  changeRentDuration(select) {
    this.rentDurationType = select.value;
  }

  setForms() {
    this.editItemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      cost: [''],
      selling: [''],
      rent: ['']
    });
  }

  editInvItem() {
    const itemForm = this.editItemForm;
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
          return false;
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

        const request = {
          data: forwardForm,
          injected: this.injectedData
        };

        this.tempSub = this.inventory.editInvItem(request).subscribe(data => {
          if (!(data.error)) {
            this.editItemForm.reset();
            this.messages.changeMessage('invUpdated');
          }
          this.dialogRef.close();
          this.matSnackBar.open(data.message, 'close');
          this.tempSub.unsubscribe();
        });
      }
    } else {
      this.matSnackBar.open('Please input all of the required fields', 'close');
    }
  }

  closeRef() {
    this.dialogRef.close();
  }

}
