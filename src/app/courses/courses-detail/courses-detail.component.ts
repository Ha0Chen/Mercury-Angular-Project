import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Product} from "../../shared/models/product";
import {switchMap} from "rxjs";
import {ProductsService} from "../../shared/services/products.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Chapter} from "../../shared/models/chapter";
import {Order} from "../../shared/models/order";
import {OrderService} from "../../shared/services/order.service";
import {AuthService} from "../../shared/services/auth.service";
import {LoginDialogComponent} from "../../login-dialog/login-dialog.component";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit{
  product: Product | undefined;
  id: string | undefined;
  //judge if the user purchased the course
  purchased: boolean = false;
  treeControl = new NestedTreeControl<Chapter>(node => node.sections);
  dataSource = new MatTreeNestedDataSource<Chapter>();
  constructor(
    private ar:ActivatedRoute,
    private ps:ProductsService,
    private os:OrderService,
    private auth:AuthService,
    private router:Router,
    private dialog:MatDialog
  ) {
    if (sessionStorage.getItem("token") && (this.auth.user == null)) {
      this.auth.checkLogin().pipe(switchMap(res => {
        this.auth.user = JSON.parse(res.user);
        this.auth.roles = res.roles.map(res => res.substring(5));
        return this.os.getOrdersByUserId(this.auth.user!.id);
      })).subscribe(res => {
        console.log(res);
        if (typeof this.os.purchasedProducts === 'undefined') {
          this.os.purchasedProducts = [];
          console.log(res);
          res.forEach(order => {
            order.products.forEach(p => {
              this.os.purchasedProducts!.push(p.id);
            });
          })
        }
      });
    }else{
      if (this.auth.user != null){
        this.os.getOrdersByUserId(this.auth.user!.id).subscribe(res =>{
          if (typeof this.os.purchasedProducts === 'undefined') {
            this.os.purchasedProducts = [];
            console.log(res);
            res.forEach(order => {
              order.products.forEach(p => {
                this.os.purchasedProducts!.push(p.id);
              });
            })
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.ar.paramMap.pipe(switchMap(params => {
      this.id = params.get("id") || '1';
      return this.ps.getProductById(this.id);
    })).subscribe(res => {
      this.product = res;
      if (this.product !== undefined){
        let chapterArr: Chapter[] = [];
        this.product.content.forEach(res=> {
          chapterArr.push(JSON.parse(res.data));
        });
        this.dataSource.data = chapterArr;
      }
    });
  }

  hasChild = (_: number, node: Chapter) => !!node.sections && node.sections.length > 0;


  addToCart(product: Product){
    if (this.auth.user == null){
      this.openLoginDialog();
    }else{
      if (!this.ps.productInCart(product)){
        this.ps.addToCart(product);
      }
    }

  }

  ifInCart(product:Product){
    return this.ps.productInCart(product);
  }

  ifPurchased(id:number):boolean{
    if (this.os.purchasedProducts !== undefined){
      return this.os.purchasedProducts.includes(id);
    }
    return false;

  }

  buyNow(product:Product) {
    if (this.auth.user == null){
      this.openLoginDialog();
    }else{
      this.addToCart(product);
      this.router.navigate(['/user/cart']).catch();
    }

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      // Perform any necessary actions after the dialog is closed
    });
  }

  jump() {
    this.router.navigate(['/video']).catch();
  }
}
