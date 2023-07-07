import {Component, Input} from '@angular/core';
import {Product} from "../../shared/models/product";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent {
  @Input()
  product:Product | undefined;

  protected readonly Math = Math;
}
