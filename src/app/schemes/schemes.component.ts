import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { SchemesService } from '../schemes.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProcessConfirmComponent } from '../process-confirm/process-confirm.component';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {

  schemes = [];

  constructor(
    private messages: MessagesService,
    private schemesServ: SchemesService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(m => {
      if (m === 'schemesUpdated') {
        this.retreiveSchemes();
      }
    });
    this.retreiveSchemes();
  }

  retreiveSchemes() {
    this.schemesServ.getAllSchemes().subscribe(res => {
      if (res.error) {
        this.matSnackBar.open(res.message, 'close');
      } else {
        this.schemes = res.message;
      }
    });
  }

  deleteScheme(did) {
    const dialogRef = this.dialog.open(ProcessConfirmComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        message: 'Are you sure you want to delete this scheme?',
        options: [
          { label: 'Yes', icon: 'done' },
          { label: 'No', icon: 'clear' }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        this.schemesServ.deleteScheme({
          discount_id: did
        }).subscribe(data => {
          if (!(data.error)) {
            this.retreiveSchemes();
          }
          this.matSnackBar.open(data.message, 'close');
        });
      }
    });
  }

}
