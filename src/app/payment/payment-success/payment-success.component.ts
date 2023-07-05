import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit{
  showSpinner = true;
  constructor(
    private os: OrderService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
  }
}
