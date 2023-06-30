import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../shared/models/product";
import {switchMap} from "rxjs";
import {ProductsService} from "../../shared/services/products.service";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Chapter} from "../../shared/models/chapter";

// const TREE_DATA: Chapter[] = [
//   {
//     name: "Chapter 1",
//     url: undefined,
//     sections: [
//       {
//         name: "Section 1.1",
//         url:"http://www.google.com",
//         sections: []
//       },
//       {
//         name: "Section 1.2",
//         url: undefined,
//         sections: [
//           {
//             name: "Subsection 1.2.1",
//             url:"abc",
//             sections: []
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: "Chapter 2",
//     url: undefined,
//     sections: [
//       {
//         name: "Section 2.1",
//         url:"abc",
//         sections: []
//       },
//     ]
//   }
// ];


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
    private ps:ProductsService
  ) {
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
    if (!this.ps.productInCart(product)){
      this.ps.addToCart(product);
    }
  }

  ifInCart(product:Product){
    return this.ps.productInCart(product);
  }
}
