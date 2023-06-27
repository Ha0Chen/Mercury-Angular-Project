import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ProductsService} from "../../shared/services/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit{
  constructor(
    public ps:ProductsService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.ps.loadCart();
  }

}
