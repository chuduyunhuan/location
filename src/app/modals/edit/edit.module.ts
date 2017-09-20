import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AlertModule } from '../alert/alert.module'
import { EditComponent } from './edit.component';


@NgModule({
  imports: [SharedModule, AlertModule],
  declarations: [EditComponent],
  exports: [EditComponent],
  providers: []
})

export class EditModule {}