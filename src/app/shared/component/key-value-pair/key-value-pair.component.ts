import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { KeyValuePair } from '../../model/key-value-pair';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-key-value-pair',
  templateUrl: './key-value-pair.component.html',
  styleUrls: ['./key-value-pair.component.sass']
})
export class KeyValuePairComponent implements OnInit {

  @Input()
  public disabledKeyEdition = true;

  @Input()
  public disabledValueEdition = true;

  @Input()
  public showKeyInput = true;

  @Input()
  public showValueInput = true;

  @Input()
  public title: string;

  @Input()
  public keyPlaceholder: string;

  @Input()
  public valuePlaceholder: string;

  @Output()
  public keyValuePairsChange: EventEmitter<Array<KeyValuePair>> = new EventEmitter<Array<KeyValuePair>>();

  public form: FormGroup;
  public keyValuePairsFormArray: FormArray;
  public isEdit: boolean;
  public keyValuePairs: Array<KeyValuePair> = [];

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      keyValuePairs: this.formBuilder.array([])
    });
  }

  public onAddItem(): void {
    this.keyValuePairsFormArray = this.form.controls.keyValuePairs as FormArray;
    this.keyValuePairsFormArray.push(this.createItem());
  }

  public onDelete(index: number): void {
    this.keyValuePairs.splice(index, 1);
    this.keyValuePairsFormArray.removeAt(index);
    this.onKeyValuePairsChange();
  }

  public onClose(): void {
    if (this.keyValuePairsFormArray) {
      this.keyValuePairs = this.keyValuePairsFormArray.value;
    }
    this.isEdit = !this.isEdit;
    this.onKeyValuePairsChange();
  }

  public onKeyValuePairsChange(): void {
    this.keyValuePairsChange.emit(this.keyValuePairs);
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      key: [{ value: '', disabled: this.disabledKeyEdition }],
      value: [{ value: '', disabled: this.disabledValueEdition }]
    });
  }

}
