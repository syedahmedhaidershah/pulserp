import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { MatListModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const erpRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      erpRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
