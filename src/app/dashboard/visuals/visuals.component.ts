import { Component } from '@angular/core';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss']
})
export class VisualsComponent {
  // @ts-ignore
  cards:never[] = [71, 78, 39, 66];

  // @ts-ignore
  pieChart:never[{never}]= [{
    name: 'Chrome',
    y: 61.41,
    sliced: true,
    selected: true
      }, {
      name: 'Internet Explorer',
      y: 11.84
    }, {
      name: 'Firefox',
        y: 10.85
    }, {
      name: 'Edge',
        y: 4.67
    }, {
      name: 'Safari',
        y: 4.18
    }, {
      name: 'Sogou Explorer',
        y: 1.64
    }, {
      name: 'Opera',
        y: 1.6
    }, {
      name: 'QQ',
        y: 1.2
    }, {
      name: 'Other',
        y: 2.61
    }];
}
