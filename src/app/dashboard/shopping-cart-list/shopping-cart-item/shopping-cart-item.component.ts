import {Component, Input} from '@angular/core';
import {Product} from "../../../shared/models/product";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  @Input() item?:Product;

  constructor(
    private ps:ProductsService
  ) {
  }
  removeFromCart(product:Product) {
    // console.log(product);
    this.ps.removeProduct(product);
    this.ps.loadCart();
  }
}
