import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-section',
  templateUrl: './sales-section.component.html',
  styleUrls: ['./sales-section.component.css']
})
export class SalesSectionComponent implements OnInit {

  constructor() { }

  sales = {
    completed: {
      rentals: 0,
      consumer: 0,
      walkIn: 0,
      salesMan: 0,
      count: 0
    },
    inProgress: {
      rentals: 0,
      consumer: 0,
      walkIn: 0,
      salesMan: 0,
      count: 0
    }
  };

  ngOnInit() {
  }

}
