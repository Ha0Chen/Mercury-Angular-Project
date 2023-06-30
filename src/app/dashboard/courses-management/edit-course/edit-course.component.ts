import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../shared/models/product";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {Chapter} from "../../../shared/models/chapter";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
  errorMessage:string | null = null;
  editCourseFormGroup!:FormGroup;
  treeControl = new NestedTreeControl<Chapter>(node => node.sections);
  dataSource = new MatTreeNestedDataSource<Chapter>();
  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Product
  ) {

  }

  showPreview(){
    console.log(this.parseFormattedString(this.editCourseFormGroup.get('content')?.value));
    this.dataSource.data = this.parseFormattedString(this.editCourseFormGroup.get('content')?.value);

  }

  ngOnInit() {
    let chapterArr: Chapter[] = [];
    this.data.content.forEach(res=> {
      chapterArr.push(JSON.parse(res.data));
    });
    this.dataSource.data = chapterArr;

    this.editCourseFormGroup = this.fb.group({
      name:[this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      content:[this.formatSections(chapterArr), Validators.required],
      price: [this.data.price, Validators.required],
    });
  }

  hasChild = (_: number, node: Chapter) => !!node.sections && node.sections.length > 0;


  formatSections(data: Chapter[], indent: number = 0): string {
    let result = "";
    for (const section of data) {
      const sectionName = section.name;
      const sectionUrl = section.url || "";
      result += "  ".repeat(indent) + `${sectionName} (url:${sectionUrl}):\n`;
      if (section.sections.length > 0) {
        result += this.formatSections(section.sections, indent + 1);
      }
    }
    return result;
  }

  parseFormattedString(formattedString: string): Chapter[] {
    const lines = formattedString.split('\n');
    const sections: Chapter[] = [];
    let currentChapter: Chapter | null = null;
    let currentSection: Chapter | null = null;
    const stack: Chapter[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      const match = line.match(/^(\s*)(.*?)(?:\s*\(url:(.*?)\))?$/);
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



}
