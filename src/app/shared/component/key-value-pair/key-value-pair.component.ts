import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { KeyValuePair } from '../../model/key-value-pair';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-key-value-pair',
  templateUrl: './key-value-pair.component.html',
  styleUrls: ['./key-value-pair.component.sass']
})
export class KeyValuePairComponent implements OnInit, OnChanges {

  @Input()
  public title: string;

  @Input()
  public disabledKeyEdition = true;

  @Input()
  public disabledValueEdition = true;

  @Input()
  public showKeyInput = true;

  @Input()
  public showValueInput = true;

  @Input()
  public showDeleteOption = true;

  @Input()
  public keyPlaceholder: string;

  @Input()
  public valuePlaceholder: string;

  @Input()
  public keyValuePairs: Array<KeyValuePair> = [];

  @Input()
  public editionMode = false;

  @Input()
  public canAddElement = true;

  @Input()
  public canSaveElement = true;

  @Output()
  public keyValuePairsChange: EventEmitter<Array<KeyValuePair>> = new EventEmitter<Array<KeyValuePair>>();

  public form: FormGroup;
  public keyValuePairsFormArray: FormArray;
  public isEdit: boolean;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      keyValuePairs: this.formBuilder.array([])
    });
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (this.keyValuePairs) {
      this.keyValuePairs.forEach(keyValuePair => {
        this.keyValuePairsFormArray = this.form.controls.keyValuePairs as FormArray;
        this.keyValuePairsFormArray.push(this.createItem(keyValuePair));
      });
    }
  }

  public onAddItem(): void {
    this.keyValuePairsFormArray = this.form.controls.keyValuePairs as FormArray;
    this.keyValuePairsFormArray.push(this.createItem(null));
  }

  public onDelete(index: number): void {
    this.keyValuePairs.splice(index, 1);
    this.keyValuePairsFormArray.removeAt(index);
    this.onKeyValuePairsChange();
  }

  public onClose(): void {
    if (this.keyValuePairsFormArray && this.keyValuePairsFormArray.length > 0) {
      if (!this.editionMode) {
        this.keyValuePairs = this.keyValuePairsFormArray.value;
      } else {
        this.keyValuePairs.push(this.keyValuePairsFormArray.value);
      }
    }

    this.isEdit = !this.isEdit;
    this.onKeyValuePairsChange();
  }

  public onKeyValuePairsChange(): void {
    this.keyValuePairsChange.emit(this.keyValuePairs);
  }

  private createItem(keyValuePair: KeyValuePair): FormGroup {
    return this.formBuilder.group({
      key: [{ value: keyValuePair ? keyValuePair.key : '', disabled: this.disabledKeyEdition }],
      value: [{ value: keyValuePair ? keyValuePair.value : '', disabled: this.disabledValueEdition }]
    });
  }

}
