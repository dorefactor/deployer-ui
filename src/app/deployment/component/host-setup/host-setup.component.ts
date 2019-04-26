import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HostSetup } from '../../model/host-setup';

@Component({
  selector: 'app-host-setup',
  templateUrl: './host-setup.component.html',
  styleUrls: ['./host-setup.component.sass']
})
export class HostSetupComponent implements OnInit {

  @Output()
  public hostsSetupChange: EventEmitter<Array<HostSetup>> = new EventEmitter<Array<HostSetup>>();

  public hostsSetupForm: FormGroup;
  public hide = true;
  public isEditHostsSetup: boolean;
  public isEditHosts: boolean;

  public hostsSetup: Array<HostSetup> = [];

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.hostsSetupForm = this.formBuilder.group({
      hostsSetup: this.formBuilder.array([])
    });
  }

  public onAddHostsSetupItem(): void {
    const hostsSetupControl = this.hostsSetupForm.controls.hostsSetup as FormArray;
    hostsSetupControl.push(this.createHostsSetupItem());
  }

  public onCloseHostsSetup(): void {
    if (this.hostsSetupForm.controls.hostsSetup) {
      this.hostsSetup = this.hostsSetupForm.controls.hostsSetup.value;
    }
    this.isEditHostsSetup = !this.isEditHostsSetup;
    this.onHostsSetupChange();
  }

  public onDeleteHostsSetupItem(index: number): void {
    const hostsSetupControl = this.hostsSetupForm.controls.hostsSetup as FormArray;
    hostsSetupControl.removeAt(index);
    this.hostsSetup.splice(index, 1);
  }

  public onAddHostsItem(index: number): void {
    const hostsControl = (this.hostsSetupForm.controls.hostsSetup as FormArray).at(index).get('hosts') as FormArray;
    hostsControl.push(this.createHostItem());
  }

  public onCloseHosts(): void {
    if (this.hostsSetupForm.controls.hostsSetup) {
      this.hostsSetup = this.hostsSetupForm.controls.hostsSetup.value;
    }
    this.isEditHosts = !this.isEditHosts;
    this.onHostsSetupChange();
  }

  public onDeleteHostsItem(index: number): void {
    const hostsControl = (this.hostsSetupForm.controls.hostsSetup as FormArray).at(index).get('hosts') as FormArray;
    hostsControl.removeAt(index);
  }

  public onHostsSetupChange(): void {
    const hostsSetup: Array<HostSetup> = this.hostsSetupForm.value.hostsSetup;
    this.hostsSetupChange.emit(hostsSetup);
  }

  private createHostsSetupItem(): FormGroup {
    return this.formBuilder.group({
      tagName: '',
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
