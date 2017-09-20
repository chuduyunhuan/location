import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AlertComponent } from './alert.component';


@NgModule({
  imports: [SharedModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: []
})

export class AlertModule {}