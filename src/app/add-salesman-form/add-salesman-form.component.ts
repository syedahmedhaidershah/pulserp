import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { SalesmanService } from '../salesman.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-add-salesman-form',
  templateUrl: './add-salesman-form.component.html',
  styleUrls: ['./add-salesman-form.component.css']
})
export class AddSalesmanFormComponent implements OnInit {

  addSalesmanForm: FormGroup;

  nicPattern = /[0-9]{13}/;
  contactPattern = /[0-9]{0,15}/;

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSalesmanFormComponent>,
    private salesman: SalesmanService,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.addSalesmanForm = this.fb.group({
      name: ['', Validators.required],
      nic: [0, Validators.pattern(this.nicPattern)],
      contact_no: ['', Validators.pattern(this.contactPattern)],
      empty: [0]
    });
  }

  addSalesman() {
    if (!(this.addSalesmanForm.valid)) {
      this.matSnackBar.open('Please input all of the fields correctly', 'close');
    } else {
      this.salesman.addSalesman(this.addSalesmanForm.value).subscribe(res => {
        this.messages.changeMessage('salesmanUpdated');
        this.matSnackBar.open(res.message, 'close');
        this.dialogRef.close();
      });
    }
  }

  checkNIC() {
    const inp = <HTMLInputElement>document.getElementById('nicInp');
    console.log(inp.value.length);
    if (inp.value.length > 13) {
      inp.value = '9999999999999';
    }
  }

}
