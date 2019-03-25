import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchemesService } from '../schemes.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrls: ['./add-scheme.component.css']
})
export class AddSchemeComponent implements OnInit {

  schemeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private schemes: SchemesService,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSchemeComponent>,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.schemeForm = this.fb.group({
      scheme_name: ['', Validators.required],
      deduction: ['', Validators.required]
    });
  }

  addDiscount() {
    if (!(this.schemeForm.valid)) {
      this.matSnackBar.open('Please input all of the fields');
    } else {
      this.schemes.addScheme(this.schemeForm.value).subscribe(res => {
        if (!(res.error)) {
          this.messages.changeMessage('schemesUpdated');
        }
        this.matSnackBar.open(res.message, 'close');
        this.dialogRef.close();
      });
    }
  }

}
