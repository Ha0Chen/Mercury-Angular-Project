import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  constructor(
    private router :Router,
    public ps: ProductsService
  ) {
  }

  jumpToCartList() {
    this.router.navigate(['/dashboard/cart']).catch();
  }

  ngOnInit(): void {
    this.ps.loadCart();
  }
}
