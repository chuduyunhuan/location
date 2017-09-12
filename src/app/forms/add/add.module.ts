import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AlertModule } from '../alert/alert.module'
import { AddComponent } from './add.component';


@NgModule({
  imports: [SharedModule, AlertModule],
  declarations: [AddComponent],
  exports: [AddComponent],
  providers: []
})

export class AddModule {}