import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Chapter} from "../../../shared/models/chapter";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../shared/models/product";
import {ProductsService} from "../../../shared/services/products.service";
import {UserService} from "../../../shared/services/user.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit{
  selectedFile?: File;
  addCourseFormGroup!:FormGroup;
  treeControl = new NestedTreeControl<Chapter>(node => node.sections);
  dataSource = new MatTreeNestedDataSource<Chapter>();
  teacherName:string = "";
  constructor(private fb: FormBuilder,
              private ps: ProductsService,
              public dialogRef: MatDialogRef<AddCourseComponent>,
              private auth: AuthService
  ) {

  }
  showPreview(){
    this.dataSource.data = this.parseFormattedString(this.addCourseFormGroup.get('content')?.value);
  }

  ngOnInit() {
    this.addCourseFormGroup = this.fb.group({
      name:['', Validators.required],
      image:['', Validators.required],
      description: ['', Validators.required],
      content:['Chapter 1(url:):\n' +
      '  Section 1.1(url:http://www.google.com):\n' +
      '  Section 1.2(url:):\n' +
      '    Subsection 1.2.1(url:http://www.google.com):\n' +
      'Chapter 2(url:):\n' +
      '  Section 2.1(url:http://www.google.com):\n' +
      '  Section 2.2(url:):\n' +
      '    Subsection 2.2.1(url:http://www.google.com):\n', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^(0|[1-9]\\d*)$')]]
    }, {validators:[AddCourseComponent.contentValidator]});

    if (this.auth.user !== null){
      this.teacherName = this.auth.user?.username;
    }
  }

  static contentValidator(fg:FormGroup):null | {[key:string]:string}{
    const lines = fg.get('content')?.value.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      const match = line.match(/^(\s*)(.+?)\(url:(\S*)\):$/);
      if (!match) {
        // console.log(`Invalid formatted string: ${line}`);
        return {ContentFormatError: `Invalid formatted string: ${line}`};
      }
    }
    return null;
  }

  hasChild = (_: number, node: Chapter) => !!node.sections && node.sections.length > 0;

  parseFormattedString(formattedString: string): Chapter[] {
    const lines = formattedString.split('\n');
    const sections: Chapter[] = [];
    let currentChapter: Chapter | null = null;
    let currentSection: Chapter | null = null;
    const stack: Chapter[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      const match = line.match(/^(\s*)(.+?)\(url:(\S*)\):$/);
      if (!match) {
        throw new Error(`Invalid formatted string: ${line}`);
      }

      const [, indentStr, name, url] = match;
      const indent = indentStr.length / 2;

      if (indent === 0) {
        currentChapter = { name, url: url || null, sections: [] };
        sections.push(currentChapter);
        stack.length = 0;
      } else if (indent === 1) {
        currentSection = { name, url: url || null, sections: [] };
        currentChapter?.sections.push(currentSection);
        stack.push(currentSection);
      } else if (indent > 1) {
        const section: Chapter = { name, url: url || null, sections: [] };
        currentSection?.sections.push(section);
        stack.push(section);
        currentSection = section;
      }
    }
    return sections;
  }

  save():void{
    const name = this.addCourseFormGroup.get("name")?.value;
    const description = this.addCourseFormGroup.get("description")?.value;
    let temp:{id:number, data:string}[] = [];
    this.parseFormattedString(this.addCourseFormGroup.get('content')?.value).forEach(chapter=> {
      let obj:{id:number, data:string} = {id: 0, data:JSON.stringify(chapter)};
      temp.push(obj);
    });
    const content = temp;
    const price = this.addCourseFormGroup.get("price")?.value;
    const image = this.addCourseFormGroup.get('image')?.value;
    let product:Product = {id: 0, name: name, description: description, content:content, sales:0,
      price: price, image: image, teacherName: this.teacherName};

    this.ps.addProduct(product).subscribe(res =>{
      console.log(res);
      this.dialogRef.close();
    });

  }

}
