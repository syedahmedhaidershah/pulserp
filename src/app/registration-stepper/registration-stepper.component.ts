import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})

export class RegistrationStepperComponent implements OnInit {
  tempSub: Subscription;

  yourInfoFormGroup: FormGroup;
  companyFormGroup: FormGroup;

  myColor = 'rgba(0,0,0,0.05)';

  showShareInp = false;
  selectedPosition = '';
  selectedPackage = null;

  subPackHeight = '0px';

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

  subPacks = [
  ];

  constructor(private matSnackBar: MatSnackBar, private fb: FormBuilder, private registration: RegistrationService) { }

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
      name: [''],
      employeeCount: [''],
      yourShare: ['']
    });
    this.setAttr();
    this.getPackages();
  }

  getPackages() {
    this.tempSub = this.registration.getAllPackages().subscribe(data => {
      if (data.error) {
        this.matSnackBar.open(data.message, 'close');
      } else {
        this.subPacks = data.message.map(p => {
          const useData = JSON.parse(p.description).data;
          p.description = {};
          // tslint:disable-next-line:forin
          useData.forEach((v: Object) => {
            Object.keys(v).forEach(k => {
              p.description[k] = v[k];
            });
          });
          return p;
        });
      }
      this.tempSub.unsubscribe();
    });
  }

  setAttr() {
    this.subPackHeight = (window.innerHeight / 4).toString().concat('px');
  }

  selectPosition(el) {
    this.selectedPosition = el.value;
    if (el.value === 'own') {
      this.showShareInp = true;
    } else {
      this.showShareInp = false;
    }
  }

  registerMe() {
    if (this.selectedPackage === null) {
      this.matSnackBar.open('Please select a package', 'close');
      return false;
    }
    if (!(this.yourInfoFormGroup.valid) || !(this.yourInfoFormGroup.valid)) {
      this.matSnackBar.open('Please input all of the fields', 'close');
      return false;
    }
    const userForm = this.yourInfoFormGroup.value;
    const companyForm = this.companyFormGroup.value;
    companyForm.yourPosition = this.selectedPosition;
    const request = {
      user: userForm,
      company: companyForm,
      package: this.selectedPackage.package_id
    };
    console.log(request);
  }

  dismissSnackbar() {
    this.matSnackBar.dismiss();
  }

  selectPackage(packid) {
    this.dismissSnackbar();
    const id = packid.replace('package_', '');
    this.selectedPackage = this.subPacks.filter(p => {
      if (p.package_id === parseInt(id, 10)) {
        return p;
      }
    })[0];
  }

}
