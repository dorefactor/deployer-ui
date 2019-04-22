import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TagSetup } from '../models/tag-setup';

@Component({
  selector: 'app-host-setup',
  templateUrl: './host-setup.component.html',
  styleUrls: ['./host-setup.component.sass']
})
export class HostSetupComponent implements OnInit {

  @Output()
  public hostsSetupChange: EventEmitter<Array<TagSetup>> = new EventEmitter<Array<TagSetup>>();

  public hostsSetupForm: FormGroup;
  public hide = true;
  public isEditTags = true;
  public isEditHosts = true;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.hostsSetupForm = this.formBuilder.group({
      tags: this.formBuilder.array([])
    });
  }

  public onAddTagItem(): void {
    const tagsControl = this.hostsSetupForm.controls.tags as FormArray;
    tagsControl.push(this.createTagItem());
  }

  public onCloseTag(): void {
    this.onHostsSetupChange();
  }

  public onDeleteTagItem(index: number): void {
    const tagsControl = this.hostsSetupForm.controls.tags as FormArray;
    tagsControl.removeAt(index);
  }

  public onAddHostItem(index: number): void {
    const hostsControl = (this.hostsSetupForm.controls.tags as FormArray).at(index).get('hosts') as FormArray;
    hostsControl.push(this.createHostItem());
  }

  public onCloseHost(): void {
    this.onHostsSetupChange();
  }

  public onDeleteHostItem(index: number): void {
    const hostsControl = (this.hostsSetupForm.controls.tags as FormArray).at(index).get('hosts') as FormArray;
    hostsControl.removeAt(index);
  }

  public onHostsSetupChange(): void {
    const hostsSetup: Array<TagSetup> = this.hostsSetupForm.value;
    this.hostsSetupChange.emit(hostsSetup);
  }

  private createTagItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      hosts: this.formBuilder.array([])
    });
  }

  private createHostItem(): FormGroup {
    return this.formBuilder.group({
      ip: '',
      username: '',
      password: ''
    });
  }

}
