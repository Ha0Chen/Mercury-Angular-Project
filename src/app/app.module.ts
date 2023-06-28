import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from "./shared/modules/custom-style.module";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {HeaderComponent} from "./header/header.component";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesOverviewComponent } from './courses/courses-overview/courses-overview.component';
import { CoursesDetailComponent } from './courses/courses-detail/courses-detail.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterModule} from "@angular/router";
import { HighchartsChartModule } from 'highcharts-angular';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {PriceRangePipe} from "./shared/pipe/price-range.pipe";
import { ShoppingCartComponent } from './header/shopping-cart/shopping-cart.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PaymentComponent } from './payment/payment.component';
import {MatStepperModule} from "@angular/material/stepper";
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    HomeComponent,
    CoursesComponent,
    CoursesOverviewComponent,
    CoursesDetailComponent,
    PriceRangePipe,
    ShoppingCartComponent,
    PaymentComponent,
    PaymentSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomStyleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgChartsModule,
    RouterModule,
    HighchartsChartModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
