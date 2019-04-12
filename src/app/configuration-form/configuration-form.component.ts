import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.sass']
})
export class ConfigurationFormComponent implements OnInit {

  hide = true;

  constructor() { }

  ngOnInit() {
  }

  public add() {
    return true;
  }

}
