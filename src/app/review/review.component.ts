import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../shared/services/review.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Chapter} from "../shared/models/chapter";
import {Review} from "../shared/models/review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  id:string | undefined;
  reviews:Review[] = [];
  constructor(
    private rs: ReviewService,
    private ar:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.ar.paramMap.pipe(switchMap(params => {
      this.id = params.get("id") || '1';
      return this.rs.findReviewsByProductId(this.id);
    })).subscribe(res =>{
        this.reviews = res;
      }
    )

  }



}
