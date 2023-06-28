import { Component } from '@angular/core';
import {ProductsService} from "../shared/services/products.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  totalPrice:number = 0;

  firstFormGroup = this._formBuilder.group({
    countryCtrl: ['', Validators.required],
    zipcodeCtrl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
  secondFormGroup = this._formBuilder.group({
    paymentMethodCtrl: ['', Validators.required],
    nameCtrl: ['', Validators.required],
    cardNumCtrl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    expiryDateCtrl: ['', [Validators.required, Validators.pattern('^[0-9][0-9]\/[0-9][0-9]$')]],
    cvcCtrl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
  isLinear = false;
  constructor(
    private ps:ProductsService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
    this.totalPrice = ps.totalPriceInCart;
  }

  completeCheckout(){
    const combineFormGroup = this._formBuilder.group({
      formGroup1: this.firstFormGroup,
      formGroup2: this.secondFormGroup
    })
    console.log(combineFormGroup.value.formGroup1);
    console.log(combineFormGroup.value.formGroup2);
    this.router.navigate(['/payment-success']).catch();
  }

  // navigateToNextStep(stepper: MatStepper) {
  //   console.log(this.secondFormGroup);
  //   // console.log("clicked");
  //   stepper.next();
  // }
}
