import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatInput, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FunctionsService } from '../functions.service';
import { startWith, map } from 'rxjs/operators';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-rent-out-form',
  templateUrl: './rent-out-form.component.html',
  styleUrls: ['./rent-out-form.component.css']
})
export class RentOutFormComponent implements OnInit {
  @ViewChild('rentAuto') itemAuto: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger) itemAutoCompleteTrig: MatAutocompleteTrigger;

  @ViewChild('rentalItemName') rentalItemName: MatInput;

  rentOutForm: FormGroup;
  sellButtonState = true;

  alertAud: HTMLAudioElement = new Audio('../../assets/aud/alert.mp3');

  invItems: any = [];
  filteredItems: Observable<Object[]>;
  selectedItem: any = {
    name: ''
  };

  salesmen: any = [];
  filteredSalesmen: Observable<Object[]>;
  selectedSalesmen: any = {
    name: ''
  };

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private funct: FunctionsService, private inventory: InventoryService) { }

  ngOnInit() {
    this.initForms();
    this.retreiveItems();
  }

  initForms() {
    this.rentOutForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [{value: '', disabled: true}, Validators.required]
    });
  }

  setListeners() {
    this.itemAuto._emitSelectEvent = (e) => {
      const itemId = this.funct.reverseStr(this.funct.reverseStr(e.value).split(')')[1].split('(')[0]);
      this.selectedItem = this.invItems.filter(i => {
        if (i.item_id === parseInt(itemId, 10)) {
          return i;
        }
      })[0];
      if (this.selectedItem.name !== '') {
        const qProp = this.rentOutForm.controls['quantity'];
        qProp.enable();
        this.rentOutForm.controls['salesman'].enable();
        this.sellButtonState = false;
        // tslint:disable-next-line:max-line-length
        document.getElementById('rentItemQuantity').setAttribute('max', this.selectedItem.quantity.toString());
        this.rentalItemName.value = e.value;
      }
    };

    const iQProp = this.rentOutForm.controls['quantity'];
    iQProp.valueChanges.subscribe(c => {
      if (c > this.selectedItem.quantity) {
        iQProp.setValue(this.selectedItem.quantity);
        this.matSnackBar.open(`Only ${this.selectedItem.quantity} remain in ${this.selectedItem.name}'s stock`, 'close');
        this.alertAud.load();
        this.alertAud.play();
      }
    });
  }

  initPipes() {
    this.filteredItems = this.rentOutForm.controls['name']
      .valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterItems(item) : this.invItems.slice())
      );
  }

  retreiveItems() {
    this.inventory.getAllRentalItems().subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
      } else {
        this.invItems = res.message;
      }
    });
  }

  private _filterItems(value: string) {
    const filterValue = value.toLowerCase();

    if (filterValue === '' || filterValue === null) {
      const qProp = this.rentOutForm.controls['quantity'];
      qProp.enable();
      this.rentOutForm.controls['salesman'].enable();
      this.sellButtonState = false;
      this.filteredItems = this.invItems.map(i => i);
      return this.invItems;
    } else {
      return this.invItems.filter(item => item.name.toLowerCase().indexOf(filterValue) !== -1);
    }

  }

  get sellButtonDisabled() {
    return this.sellButtonState;
  }

}
