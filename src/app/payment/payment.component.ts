import { Component } from '@angular/core';
import {ProductsService} from "../shared/services/products.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {OrderService} from "../shared/services/order.service";
import {Order} from "../shared/models/order";

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
    private router: Router,
    private as: AuthService,
    private os: OrderService
  ) {
    this.totalPrice = ps.totalPriceInCart;
    if (localStorage.getItem("token") && this.as.user === null){
      this.as.checkLogin().subscribe(res =>{
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
      });
    }
  }

  completeCheckout(){
    // const combineFormGroup = this._formBuilder.group({
    //   formGroup1: this.firstFormGroup,
    //   formGroup2: this.secondFormGroup
    // })
    // console.log(combineFormGroup.value.formGroup1);
    // console.log(combineFormGroup.value.formGroup2);
    if (this.as.user !== null){

    }else{

    }
    const userId:number= this.as.user?.id || 0;
    const country= this.firstFormGroup.get("countryCtrl")?.value;
    const zipcode= this.firstFormGroup.get("zipcodeCtrl")?.value;
    const paymentMethod = this.secondFormGroup.get("paymentMethodCtrl")?.value;
    const name= this.secondFormGroup.get("nameCtrl")?.value;
    const cardNum= this.secondFormGroup.get("cardNumCtrl")?.value;
    const expiryDate= this.secondFormGroup.get("expiryDateCtrl")?.value;
    const cvc:string | number= this.secondFormGroup.get("cvcCtrl")?.value || 0;
    const pruchase_date = new Date();
    const products = this.ps.cart;

    // @ts-ignore
    let order:Order = {userId: userId, country:country, zipcode:zipcode, paymentMethod: paymentMethod, nameOnCard:name, cardNum:cardNum, expiryDate:expiryDate, cvc:cvc, totalPrice: this.ps.totalPriceInCart, products:products, purchaseDate: pruchase_date}
    console.log(order);
    this.os.save(order).subscribe(res => {
      if (res !== null){
        this.ps.clearCart();
        this.router.navigate(['/payment-success']).catch();
      }

    });



  }

  // navigateToNextStep(stepper: MatStepper) {
  //   console.log(this.secondFormGroup);
  //   // console.log("clicked");
  //   stepper.next();
  // }
}
