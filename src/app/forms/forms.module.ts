import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddModule } from './add/add.module';
import { EditModule } from './edit/edit.module';
import { FormsComponent } from './forms.component';

const modules = [
  SharedModule, AddModule, EditModule
];
@NgModule({
  imports: [...modules],
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: []
})

export class FormsModule {}