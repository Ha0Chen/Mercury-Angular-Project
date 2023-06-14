import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DashboardSidebarComponent} from './sidebar/sidebar.component';
import {CustomStyleModule} from "../shared/modules/custom-style.module";
import { VisualsComponent } from './visuals/visuals.component';
import { AreaComponent } from './visuals/area/area.component';
import {HighchartsChartModule} from "highcharts-angular";
import { CardComponent } from './visuals/card/card.component';
import { PieComponent } from './visuals/pie/pie.component';

const routes:Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'visuals',
        component: VisualsComponent
      }
      // {
      //   path: 'video',
      //   component: VideoComponent
      // }
    ]
  }];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidebarComponent,
    VisualsComponent,
    AreaComponent,
    CardComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomStyleModule,
    HighchartsChartModule
  ]
})
export class DashboardModule{};
