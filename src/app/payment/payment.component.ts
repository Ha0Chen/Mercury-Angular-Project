import { Component } from '@angular/core';
import {ProductsService} from "../shared/services/products.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  totalPrice:number = 0;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  constructor(
    private ps:ProductsService,
    private _formBuilder: FormBuilder
  ) {
    this.totalPrice = ps.totalPriceInCart;
  }




}
