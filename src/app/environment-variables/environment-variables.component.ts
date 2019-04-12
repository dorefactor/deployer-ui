import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-environment-variables',
  templateUrl: './environment-variables.component.html',
  styleUrls: ['./environment-variables.component.sass']
})
export class EnvironmentVariablesComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public addEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  environmentVariables: Array<any> = [
    {
      name: 'Default Name 1',
      value: 'Default Value 1'
    },
    {
      name: 'Default Name 2',
      value: 'Default Value 2'
    }
  ];
  newAttribute: any = {};

  firstField = true;
  firstFieldName = 'First Item name';
  isEditItems: boolean;

  constructor() { }

  ngOnInit() {
  }

  // candidates: any[] = [
  //   {
  //     'name': 'Default Name',
  //     'title': 'Job Title',
  //   },
  //   {
  //     'name': 'Default Name 2',
  //     'title': 'Job Title',
  //   }
  // ];

  addFieldValue(index) {
    if (this.environmentVariables.length <= 10) {
      this.environmentVariables.push(this.newAttribute);
      this.newAttribute = {};
    } else {

    }
  }

  deleteFieldValue(index) {
    this.environmentVariables.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }

}
