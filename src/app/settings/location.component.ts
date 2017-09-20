import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'settings-location',
  templateUrl: './location.component.html'
})
export class SettingsLocationComponent {
  locations = [{
    name: 'Santa Clara',
    latitude: 30,
    longitude: 50,
    city: '',
    country: 'United States',
    numberOfVCD: 1,
    description: ''
  }, {
    name: 'New Jersey',
    latitude: 40,
    longitude: 60,
    city: 'Princeton',
    country: 'United States',
    numberOfVCD: 1,
    description: 'University Princeton'
  }, {
    name: 'Las vegas',
    latitude: 60,
    longitude: 50,
    city: '',
    country: 'United States',
    numberOfVCD: 1,
    description: ''
  }];
  selectedLocation: object;

  formOpen = false;
  formAction: string;
  locationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    latitude: new FormControl(0, Validators.compose([
      Validators.max(90),
      Validators.min(-90)
    ])),
    longitude: new FormControl(0, Validators.compose([
      Validators.max(180),
      Validators.min(-180)
    ])),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    numberOfVCD: new FormControl(0),
    description: new FormControl('')
  });
  submitted = false;

  constructor(private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  addLocation(): void {
    this.formAction = 'add';
    this.locationForm.reset();
    this.submitted = false;
    this.formOpen = true;
  }

  editLocation(id): void {
    this.formAction = 'edit';
    this.locationForm.setValue(this.selectedLocation);
    this.locationForm.markAsPristine();
    this.formOpen = true;
  }

  saveLocation(): void {
    console.log(this.locationForm.value);

    if (this.formAction === 'add') {
    } else {
    }

    // TODO: after saved,
    this.formOpen = false
  }
}
