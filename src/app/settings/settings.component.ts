import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent{
  id: number;
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
}
