import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./courses/courses.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CoursesDetailComponent} from "./courses/courses-detail/courses-detail.component";
import {PaymentComponent} from "./payment/payment.component";
import {PaymentSuccessComponent} from "./payment/payment-success/payment-success.component";
import {AuthGuard} from "./shared/guards/auth.guard.guard";
import {VideoComponent} from "./video/video.component";

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'user',
    // lazy loading syntax
    // angular 7 and before
    //loadChildren: './prime/prime.module#PrimeModule'
    //angular 8+
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    //canActivate will lazy load the module while canLoad will not if condition is not met
    canActivate:[AuthGuard]
  },
  {
    path: 'courses/:id',
    component: CoursesDetailComponent
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate:[AuthGuard]
  },
  // needs to put it in the end of array
  {
    path: '**',
    redirectTo: 'courses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
