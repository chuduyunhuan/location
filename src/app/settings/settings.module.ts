import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsLocationComponent } from './location.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [SettingsComponent, SettingsLocationComponent],
  exports: [SettingsComponent, SettingsLocationComponent],
  providers: []
})

export class SettingsModule {
}
