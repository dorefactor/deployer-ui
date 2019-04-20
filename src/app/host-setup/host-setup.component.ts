import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TuplaThree } from '../models/tupla-three';
import { HostSetup } from '../models/host-setup';

@Component({
  selector: 'app-host-setup',
  templateUrl: './host-setup.component.html',
  styleUrls: ['./host-setup.component.sass']
})
export class HostSetupComponent implements OnInit {

  // @Input()
  // public title: string;

  // @Input()
  // public valuePlaceholder1: string;

  // @Input()
  // public valuePlaceholder2: string;

  // @Input()
  // public valuePlaceholder3: string;

  @Output()
  public hostsSetupChange: EventEmitter<Array<HostSetup>> = new EventEmitter<Array<HostSetup>>();

  public hide = true;
  public form: FormGroup;
  public formArray: FormArray;
  public isEdit: boolean;
  public hostsSetup: Array<HostSetup> = [];

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      tags: this.formBuilder.array([])
    });
  }

  public onAddItem(): void {
    this.formArray = this.form.controls.tags as FormArray;
    this.formArray.push(this.createItem());
    this.hostsSetup.push(new HostSetup());
  }

  public onClose(): void {
    // if (this.formArray) {
    //   this.hostsSetup = this.formArray.value;
    // }
    this.isEdit = !this.isEdit;
    this.onHostsSetupChange();
    console.log(JSON.stringify(this.hostsSetup));
  }

  public onDelete(index: number): void {
    this.hostsSetup.splice(index, 1);
    this.formArray.removeAt(index);
    this.onHostsSetupChange();
  }

  public onHostsSetupChange(): void {
    this.hostsSetupChange.emit(this.hostsSetup);
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      tagName: ''
    });
  }

  public onTuplaThreeChange(index: number, hosts: Array<TuplaThree>) {
    console.log(JSON.stringify(hosts));
    console.log(index);
    if (this.hostsSetup[index]) {
      this.hostsSetup[index].hosts = hosts;
    }
  }

}
