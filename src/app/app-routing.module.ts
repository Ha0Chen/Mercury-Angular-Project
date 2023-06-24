import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CoursesDetailComponent} from "./courses/courses-detail/courses-detail.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'dashboard',
    // lazy loading syntax
    // angular 7 and before
    //loadChildren: './prime/prime.module#PrimeModule'
    //angular 8+
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    //canActivate will lazy load the module while canLoad will not if condition is not met
    // canActivate:[AuthGuard]
  },
  {
    path: 'courses/:id',
    component: CoursesDetailComponent
  },
  // needs to put it in the end of array
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
