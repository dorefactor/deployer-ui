import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { HostSetup } from '../../model/host-setup';
import { TuplaThree } from 'src/app/shared/model/tupla-three';

@Component({
  selector: 'app-host-setup',
  templateUrl: './host-setup.component.html',
  styleUrls: ['./host-setup.component.sass']
})
export class HostSetupComponent implements OnInit, OnChanges {

  @Input()
  public hostsSetup: Array<HostSetup> = [];

  @Input()
  public editionMode = true;

  @Output()
  public hostsSetupChange: EventEmitter<Array<HostSetup>> = new EventEmitter<Array<HostSetup>>();

  public form: FormGroup;
  public isEditHostsSetup: boolean;
  public isEditHosts: boolean;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      hostsSetup: this.formBuilder.array([])
    });
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (this.hostsSetup) {
      this.hostsSetup.forEach((hostSetup) => {
        const control = this.form.controls.hostsSetup as FormArray;
        control.push(this.createHostsSetupItem(hostSetup, false));
      });
    }
  }

  public onAddHostsSetupItem(): void {
    const hostsSetupControl = this.form.controls.hostsSetup as FormArray;
    hostsSetupControl.push(this.createHostsSetupItem(null, true));
  }

  public onCloseHostsSetup(): void {
    if (this.form.controls.hostsSetup) {
      this.hostsSetup = this.form.controls.hostsSetup.value;
    }
    this.isEditHostsSetup = !this.isEditHostsSetup;
    this.onHostsSetupChange();
  }

  public onDeleteHostsSetupItem(index: number): void {
    const hostsSetupControl = this.form.controls.hostsSetup as FormArray;
    hostsSetupControl.removeAt(index);
    this.hostsSetup.splice(index, 1);
  }

  public onAddHostsItem(hostSetupIndex: number): void {
    const hostsControl = (this.form.controls.hostsSetup as FormArray).at(hostSetupIndex).get('hosts') as FormArray;
    hostsControl.push(this.createHostItem(null));
  }

  public onCloseHosts(): void {
    if (this.editionMode && this.form.controls.hostsSetup) {
      this.hostsSetup = this.form.controls.hostsSetup.value;
    }
    this.isEditHosts = !this.isEditHosts;
    this.onHostsSetupChange();
  }

  public onDeleteHostsItem(hostSetupIndex: number, hostIndex: number): void {
    const hostsControl = (this.form.controls.hostsSetup as FormArray).at(hostSetupIndex).get('hosts') as FormArray;
    hostsControl.removeAt(hostIndex);
    this.hostsSetup[hostSetupIndex].hosts.splice(hostIndex, 1);
    this.onHostsSetupChange();
  }

  public onHostsSetupChange(): void {
    const hostsSetup: Array<HostSetup> = this.form.value.hostsSetup;
    this.hostsSetupChange.emit(hostsSetup);
  }

  public onSelectHostsSetupItem(index: number): void {
    this.hostsSetup[index].selected = !this.hostsSetup[index].selected;
  }

  public onSelectHostItem(hostSetupIndex: number, hostIndex: number): void {
    this.hostsSetup[hostSetupIndex].hosts[hostIndex].selected = !this.hostsSetup[hostSetupIndex].hosts[hostIndex].selected;
  }

  private createHostsSetupItem(hostSetup: HostSetup, select: boolean): FormGroup {
    const group = this.formBuilder.group({
      selected: select,
      tag: hostSetup ? hostSetup.tag : '',
      hosts: hostSetup ? this.formBuilder.array([hostSetup.hosts]) : this.formBuilder.array([])
    });

    return group;
  }

  private createHostItem(host: TuplaThree): FormGroup {
    return this.formBuilder.group({
      selected: false,
      ip: host ? host.value1 : '',
      username: host ? host.value2 : '',
      password: host ? host.value3 : ''
    });
  }

}
