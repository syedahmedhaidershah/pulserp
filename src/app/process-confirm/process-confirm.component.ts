import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProcessConfirm } from '../process-confirm';

@Component({
  selector: 'app-process-confirm',
  templateUrl: './process-confirm.component.html',
  styleUrls: ['./process-confirm.component.css']
})
export class ProcessConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProcessConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData: ProcessConfirm) { }

  ngOnInit() {
  }

  closeRef(data) {
    this.dialogRef.close(data);
  }

  setRetRes(label) {
    this.dialogRef.close(label.toLowerCase());
  }

}
