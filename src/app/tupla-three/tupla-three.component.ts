import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { KeyValuePair } from '../models/key-value-pair';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TuplaThree } from '../models/tupla-three';

@Component({
  selector: 'app-tupla-three',
  templateUrl: './tupla-three.component.html',
  styleUrls: ['./tupla-three.component.sass']
})
export class TuplaThreeComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public valuePlaceholder1: string;

  @Input()
  public valuePlaceholder2: string;

  @Input()
  public valuePlaceholder3: string;

  @Output()
  public tuplaThreeChange: EventEmitter<Array<TuplaThree>> = new EventEmitter<Array<TuplaThree>>();

  public hide = true;
  public form: FormGroup;
  public tuplaThreeFormArray: FormArray;
  public isEdit: boolean;
  public tuplaThree: Array<TuplaThree> = [];

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      tuplaThree: this.formBuilder.array([])
    });
  }

  public onAddItem(): void {
    this.tuplaThreeFormArray = this.form.controls.tuplaThree as FormArray;
    this.tuplaThreeFormArray.push(this.createItem());
  }

  public onClose(): void {
    if (this.tuplaThreeFormArray) {
      this.tuplaThree = this.tuplaThreeFormArray.value;
    }
    this.isEdit = !this.isEdit;
    this.ontuplaThreeChange();
  }

  public onDelete(index: number): void {
    this.tuplaThree.splice(index, 1);
    this.tuplaThreeFormArray.removeAt(index);
    this.ontuplaThreeChange();
  }

  public ontuplaThreeChange(): void {
    this.tuplaThreeChange.emit(this.tuplaThree);
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      value1: '',
      value2: '',
      value3: ''
    });
  }

}
