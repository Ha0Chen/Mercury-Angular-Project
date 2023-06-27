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

const routes:Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'visuals',
        component: VisualsComponent
      },
      {
        path: 'cart',
        component: ShoppingCartListComponent
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomStyleModule,
    HighchartsChartModule,
    NgOptimizedImage
  ]
})
export class DashboardModule{};
