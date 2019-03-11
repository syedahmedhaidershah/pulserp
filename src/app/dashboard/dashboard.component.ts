import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  maxHeight = '0px';
  dateFirst = null;
  dateToday = null;

  constructor() { }

  ngOnInit() {
    this.setAttr();
  }
  
  setAttr() {
    this.maxHeight = (window.innerHeight - 74).toString().concat('px');

    const useDate = new Date();
    this.dateToday = useDate.toDateString();
    useDate.setDate(1);
    this.dateFirst = useDate.toDateString();
  }

}
