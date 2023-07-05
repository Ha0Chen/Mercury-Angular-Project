import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {DashboardSidebarComponent} from './sidebar/sidebar.component';
import {CustomStyleModule} from "../shared/modules/custom-style.module";
import { VisualsComponent } from './visuals/visuals.component';
import { AreaComponent } from './visuals/area/area.component';
import {HighchartsChartModule} from "highcharts-angular";
import { CardComponent } from './visuals/card/card.component';
import { PieComponent } from './visuals/pie/pie.component';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartItemComponent } from './shopping-cart-list/shopping-cart-item/shopping-cart-item.component';
import { CoursesManagementComponent } from './courses-management/courses-management.component';
import {TeacherGuard} from "../shared/guards/teacher.guard";
import {MatSortModule} from "@angular/material/sort";
import { EditCourseComponent } from './courses-management/edit-course/edit-course.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddCourseComponent } from './courses-management/add-course/add-course.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { OrdersComponent } from './orders/orders.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { CommentDialogComponent } from './orders/comment-dialog/comment-dialog.component';
import {AdminGuard} from "../shared/guards/admin.guard";
import { UserListComponent } from './user-list/user-list.component';

const routes:Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: VisualsComponent,
        canActivate:[AdminGuard]
      },
      {
        path: 'cart',
        component: ShoppingCartListComponent
      },
      {
        path: 'my-courses',
        component: CoursesManagementComponent,
        canActivate: [TeacherGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'my-reviews',
        component: MyReviewsComponent
      }
    ]
  }];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidebarComponent,
    VisualsComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ShoppingCartListComponent,
    ShoppingCartItemComponent,
    CoursesManagementComponent,
    EditCourseComponent,
    AddCourseComponent,
    OrdersComponent,
    MyReviewsComponent,
    CommentDialogComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomStyleModule,
    HighchartsChartModule,
    NgOptimizedImage,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxMatFileInputModule
  ]
})
export class DashboardModule{};
