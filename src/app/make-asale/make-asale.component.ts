import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InventoryService } from '../inventory.service';
import { MatSnackBar, MatAutocomplete, MatInput, MatAutocompleteTrigger } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FunctionsService } from '../functions.service';
import { SalesmanService } from '../salesman.service';
import { MessagesService } from '../messages.service';
import { SchemesService } from '../schemes.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-make-asale',
  templateUrl: './make-asale.component.html',
  styleUrls: ['./make-asale.component.css']
})
export class MakeASaleComponent implements OnInit {
  @ViewChild('auto') itemAuto: MatAutocomplete;

  @ViewChild('salesmanAuto') salesmanAuto: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger) itemAutoCompleteTrig: MatAutocompleteTrigger;

  @ViewChild('itemName') itemName: MatInput;

  @ViewChild('salesmanName') salesmanName: MatInput;

  saleForm: FormGroup;
  sellButtonState = true;

  totalBill: any = 0;
  addDis = 0;

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

  availableSchemes = [];
  appliedSchemes = [];

  addedProducts = [];

  // tslint:disable-next-line:max-line-length
  constructor(
    private fb: FormBuilder,
    private inventory: InventoryService,
    private matSnackBar: MatSnackBar,
    private funct: FunctionsService,
    private salesmanServ: SalesmanService,
    private messages: MessagesService,
    private schemes: SchemesService,
    private sales: SalesService
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(m => {
      if (m === 'schemesUpdated') {
        this.retreiveSchemes();
      }
    });
    this.initForms();
    this.setListeners();
    this.retreiveItems();
    this.retreiveSalesmen();
    this.retreiveSchemes();
    this.initPipes();
  }

  retreiveSchemes() {
    this.schemes.getAllSchemes().subscribe(res => {
      if (!(res.error)) {
        this.availableSchemes = res.message;
      } else {
        this.matSnackBar.open('An error occurred retreiving schemes', 'close');
      }
    });
  }

  retreiveSalesmen() {
    this.salesmanServ.getAllSalesmen().subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
      } else {
        this.salesmen = res.message;
        this.filteredSalesmen = this.saleForm.controls['salesman']
          .valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterSalesmen(item) : this.salesmen.slice())
          );
      }
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
      this.saleForm.controls['name'].setValue(this.selectedItem.name);
      if (this.selectedItem.name !== '') {
        const qProp = this.saleForm.controls['quantity'];
        qProp.enable();
        this.saleForm.controls['salesman'].enable();
        this.saleForm.controls['deposit'].enable();
        this.sellButtonState = false;
        // tslint:disable-next-line:max-line-length
        document.getElementById('itemQuantity').setAttribute('max', this.selectedItem.quantity.toString());
        this.itemName.value = e.value;
      }
    };

    const iQProp = this.saleForm.controls['quantity'];
    iQProp.valueChanges.subscribe(c => {
      if (c > this.selectedItem.quantity) {
        iQProp.setValue(this.selectedItem.quantity);
        this.matSnackBar.open(`Only ${this.selectedItem.quantity} remain in ${this.selectedItem.name}'s stock`, 'close');
        this.alertAud.load();
        this.alertAud.play();
      }
    });

    this.salesmanAuto._emitSelectEvent = (e) => {
      const salesmanId = this.funct.reverseStr(this.funct.reverseStr(e.value).split(')')[1].split('(')[0]);
      this.selectedSalesmen = this.salesmen.filter(i => {
        if (i.customer_id === parseInt(salesmanId, 10)) {
          return i;
        }
      })[0];
      this.saleForm.controls['salesman'].setValue(this.selectedSalesmen.name);
      if (this.selectedSalesmen.name !== '') {
        // tslint:disable-next-line:max-line-length
        // document.getElementById('itemQuantity').setAttribute('max', this.selectedItem.quantity.toString());
        this.salesmanName.value = e.value;
      }
    };
  }

  initPipes() {
  }

  retreiveItems() {
    this.inventory.getAllConsumerItems().subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
      } else {
        this.invItems = res.message;
        this.filteredItems = this.saleForm.controls['name']
          .valueChanges
          .pipe(
            startWith(''),
            map(item => item ? this._filterItems(item) : this.invItems.slice())
          );
      }
    });
  }

  itemInpClicked($e: Event) {
    $e.stopPropagation();
    this.itemAutoCompleteTrig.openPanel();
  }

  initForms() {
    this.saleForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [{ value: '', disabled: true }, Validators.required],
      deposit: [{ value: '', disabled: true }, Validators.required],
      salesman: [{ value: '', disabled: true }, Validators.required]
    });
  }

  private _filterSalesmen(value: string) {
    const filterValue = value.toLowerCase();

    if (filterValue === '' || filterValue === null) {
      this.saleForm.controls['salesman'].enable();
      this.saleForm.controls['deposit'].enable();
      this.sellButtonState = false;
      this.filteredItems = this.salesmen.map(i => i);
      return this.salesmen;
    } else {
      return this.salesmen.filter(item => item.name.toLowerCase().indexOf(filterValue) !== -1);
    }

  }

  private _filterItems(value: string) {
    const filterValue = value.toLowerCase();

    if (filterValue === '' || filterValue === null) {
      const qProp = this.saleForm.controls['quantity'];
      qProp.disable();
      this.saleForm.controls['salesman'].disable();
      this.saleForm.controls['deposit'].disable();
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

  addSchemeToSale(did) {
    const toPush = this.availableSchemes.filter(s => {
      if (s.discount_id === parseInt(did, 10)) {
        return s;
      }
    });
    if (toPush.length > 0) {
      const check = this.appliedSchemes.filter(sc => {
        if (sc.discount_id === toPush[0].discount_id) {
          return sc;
        }
      });
      if (check.length === 0) {
        this.appliedSchemes.push(toPush[0]);
      }
    }
  }

  remSchemeFromSale(did) {
    this.appliedSchemes = this.appliedSchemes.filter(s => {
      if (s.discount_id !== parseInt(did, 10)) {
        return s;
      }
    });
  }

  addItemToList() {
    const saleForm = this.saleForm;
    if (saleForm.valid) {
      const check = this.addedProducts.filter(si => {
        if (this.selectedItem.item_id === si.item_id) {
          return si;
        }
      });

      if (check.length > 0) {
        this.matSnackBar.open('Item already on list', 'close');
        return false;
      }

      const addDis = <HTMLInputElement>(document.getElementById('additionalDiscount'));
      const val: any = addDis.value;
      if (val.length === 0) {
        this.addDis = 0;
      } else {
        this.addDis = parseInt(val, 10);
      }
      addDis.value = '';

      console.log(this.addDis);

      // tslint:disable-next-line:max-line-length
      let balance = this.selectedItem.selling * saleForm.controls['quantity'].value - saleForm.controls['deposit'].value - this.addDis;

      this.appliedSchemes.forEach(s => {
        balance -= s.deduction;
      });


      if (balance < 0) {
        this.matSnackBar.open('The balance is negative', 'close');
        return false;
      }

      this.totalBill += balance;
      const pushItem = {
        customer_id: this.selectedSalesmen.customer_id,
        item_id: this.selectedItem.item_id,
        quantity: saleForm.controls['quantity'].value,
        deposit: saleForm.controls['deposit'].value,
        balance: balance,
        discounts: this.getContainerForArr(this.appliedSchemes.map(i => i.discount_id))
      };
      this.addedProducts.push(pushItem);
      this.saleForm.reset();
    } else {
      this.matSnackBar.open('Please input all of the fields to make a sale', 'close');
    }
  }

  getContainerForArr(arr) {
    let ret = '';

    arr.forEach(v => {
      ret = ret.concat(`${v}_`);
    });

    return ret;
  }

  getText(p) {
    const toRet = (this.invItems.filter(i => {
      if (i.item_id === p.item_id) {
        return i;
      }
    })[0]);
    return toRet.name;
  }

  makeASale() {
    if (this.addedProducts.length > 0) {
      this.sales.makeASale(this.addedProducts).subscribe(res => {
        if (res.error) {
        } else {
          this.saleForm.reset();
          this.messages.changeMessage('invUpdated');
          this.addedProducts = [];
          this.selectedItem.name = '';
          this.appliedSchemes = [];
          this.totalBill = 0;
          this.retreiveItems();
        }
        this.matSnackBar.open(res.message, 'close');
      });
    }
  }

  removeFromList(itemId) {
    this.addedProducts = this.addedProducts.filter(p => {
      if (p.item_id !== parseInt(itemId, 10)) {
        return p;
      } else {
        this.totalBill -= p.balance;
      }
    });
    this.appliedSchemes = [];
  }

}
