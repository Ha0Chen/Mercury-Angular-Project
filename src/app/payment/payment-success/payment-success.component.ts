import { Component } from '@angular/core';
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

  constructor(
    private os: OrderService
  ) {
  }
}
