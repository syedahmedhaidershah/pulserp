import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-selector-interrupt',
  templateUrl: './selector-interrupt.component.html',
  styleUrls: ['./selector-interrupt.component.css']
})
export class SelectorInterruptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectorInterruptComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData: any) { }

  ngOnInit() {
  }

  closeRef(data) {
    this.dialogRef.close(data);
  }

  setRetRes(label) {
    this.dialogRef.close(label.toLowerCase());
  }
}
