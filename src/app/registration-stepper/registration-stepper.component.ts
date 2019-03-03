import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})

export class RegistrationStepperComponent implements OnInit {
  yourInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;

  showShareInp = false;
  selectedPosition = '';

  companyPositions = [
    {
      value: 'acc',
      viewValue: 'Accountant',
    },
    {
      value: 'ret',
      viewValue: 'Retailer/Wholesaler',
    },
    {
      value: 'man',
      viewValue: 'Manager',
    },
    {
      value: 'own',
      viewValue: 'Partner / Owner'
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.yourInfoFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', Validators.required]
    });
    this.companyFormGroup = this.fb.group({
      name: ['', Validators.required],
      employeeCount: [''],
      yourShare: ['']
    });
  }

  selectPosition(el) {
    this.selectedPosition = el.value;
    if (el.value === 'own') {
      this.showShareInp = true;
    } else {
      this.showShareInp = false;
    }
  }

}
