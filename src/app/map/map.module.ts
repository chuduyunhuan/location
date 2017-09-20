import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map.component';

import { ModalsModule } from '../modals/modals.module';
import { MapRoutingModule } from './map-routing.module';

const module = [
  SharedModule, MapRoutingModule, ModalsModule
];

@NgModule({
  imports: [...module],
  declarations: [MapComponent],
  exports: [MapComponent],
  providers: []
})

export class MapModule {}