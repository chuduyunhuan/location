import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map.component';

import { FormsModule } from '../forms/forms.module';
import { MapRoutingModule } from './map-routing.module';

const module = [
  SharedModule, MapRoutingModule, FormsModule
];

@NgModule({
  imports: [...module],
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: []
})

export class MapModule {}