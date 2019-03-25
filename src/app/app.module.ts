import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { MatListModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSelectModule, MatGridListModule, MatRippleModule, MatDialogModule, MatDividerModule, MatAutocompleteModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationStepperComponent } from './registration-stepper/registration-stepper.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { LoginService } from './login.service';
import { SettingsComponent } from './settings/settings.component';
import { SalesSectionComponent } from './sales-section/sales-section.component';
import { InventorySectionComponent } from './inventory-section/inventory-section.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { ProcessConfirmComponent } from './process-confirm/process-confirm.component';
import { InventoryItemsInteractiveComponent } from './inventory-items-interactive/inventory-items-interactive.component';
import { EditInvItemComponent } from './edit-inv-item/edit-inv-item.component';
import { MessagesService } from './messages.service';
import { SalesRecordsComponent } from './sales-records/sales-records.component';
import { MakeASaleComponent } from './make-asale/make-asale.component';
import { MakeASaleDialogComponent } from './make-a-sale-dialog/make-a-sale-dialog.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SelectorInterruptComponent } from './selector-interrupt/selector-interrupt.component';
import { AddInvItemComponent } from './add-inv-item/add-inv-item.component';
import { RentOutFormComponent } from './rent-out-form/rent-out-form.component';
import { ReStockItemComponent } from './re-stock-item/re-stock-item.component';
import { SalesmanComponent } from './salesman/salesman.component';
import { AddSalesmanComponent } from './add-salesman/add-salesman.component';
import { AddSalesmanFormComponent } from './add-salesman-form/add-salesman-form.component';
import { SchemesComponent } from './schemes/schemes.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';

const erpRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'sales', component: SalesRecordsComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    AboutComponent,
    RegisterComponent,
    RegistrationStepperComponent,
    PagenotfoundComponent,
    SettingsComponent,
    SalesSectionComponent,
    InventorySectionComponent,
    SalesChartComponent,
    InventoryComponent,
    SalesComponent,
    ProcessConfirmComponent,
    InventoryItemsInteractiveComponent,
    EditInvItemComponent,
    SalesRecordsComponent,
    MakeASaleComponent,
    MakeASaleDialogComponent,
    SalesListComponent,
    SelectorInterruptComponent,
    AddInvItemComponent,
    RentOutFormComponent,
    ReStockItemComponent,
    SalesmanComponent,
    AddSalesmanComponent,
    AddSalesmanFormComponent,
    SchemesComponent,
    AddSchemeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatRippleModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      erpRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LoginService,
    AuthGuard,
    MessagesService
  ],
  entryComponents: [
    ProcessConfirmComponent,
    EditInvItemComponent,
    SelectorInterruptComponent,
    ReStockItemComponent,
    MakeASaleDialogComponent,
    AddSalesmanComponent,
    AddSchemeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
