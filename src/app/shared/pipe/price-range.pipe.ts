import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "../models/product";

@Pipe({
  name: 'priceRange'
})

export class PriceRangePipe implements PipeTransform{
  transform(
    products: Product[],
    min:number | undefined =Number.MIN_VALUE,
    max:number | undefined = Number.MAX_VALUE
  ){
    min = min || Number.MIN_VALUE;
    max = max || Number.MAX_VALUE;
    console.log(products.filter((p) => (p.price >= min && p.price <= max)));
    return products.filter((p) => (p.price >= min && p.price <= max));
  }
}
