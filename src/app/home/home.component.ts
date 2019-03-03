import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  loginSub: Subscription;

  constructor(private router: Router, private fb: FormBuilder, private matSnackBar: MatSnackBar, private login: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
    });
  }

  closeMatSnackBar() {
    this.matSnackBar.dismiss();
  }

  logUserIn() {
    if (!(this.loginForm.valid)) {
      this.matSnackBar.open('Please input all of the required fields', 'close');
    } else {
      const val = this.loginForm.value;
      this.loginSub = this.login.loginUser(val).subscribe((data) => {
        if ((typeof data).toLowerCase() === 'object') {
          if (data.error) {
            this.matSnackBar.open(data.message, 'close');
          } else {
            this.router.navigate(['dashboard']);
            this.loginSub.unsubscribe();
          }
        } else {
          this.matSnackBar.open('An error occured, please try again later', 'close');
        }
      });
    }
  }

}
