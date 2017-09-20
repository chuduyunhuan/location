import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsLocationComponent } from './location.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [{
      path: '',
      component: SettingsLocationComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
