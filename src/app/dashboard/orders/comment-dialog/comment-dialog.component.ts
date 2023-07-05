import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Chapter} from "../../../shared/models/chapter";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {ProductsService} from "../../../shared/services/products.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../shared/services/auth.service";
import {Product} from "../../../shared/models/product";
import {Review} from "../../../shared/models/review";
import {ReviewService} from "../../../shared/services/review.service";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit{
  commentFormGroup!:FormGroup;
  product:Product | undefined;
  rating: number = 0;
  constructor(private fb: FormBuilder,
              private ps: ProductsService,
              public dialogRef: MatDialogRef<CommentDialogComponent>,
              private auth: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: {item:Product, id: number},
              private rs: ReviewService
  ) {

  }

  ngOnInit() {
    this.commentFormGroup = this.fb.group({
      rating:[0, Validators.required],
      content:['', Validators.required]
    });

    this.product = this.data.item;

  }

  save():void{
    console.log(this.commentFormGroup.get("rating")?.value);
    console.log(this.commentFormGroup.get("content")?.value);
    const rating = this.commentFormGroup.get("rating")?.value;
    const content = this.commentFormGroup.get("content")?.value;

    let review:Review = {id: 0, userId:this.auth.user?.id!, userName:this.auth.user?.username!,
      productId: this.product?.id!, productName: this.product?.name!, date: new Date(),
      content:content, rating: rating, orderId: this.data.id};

    this.rs.save(review).subscribe(res=>{
      console.log(res);
      this.dialogRef.close();
    });
  }
}
