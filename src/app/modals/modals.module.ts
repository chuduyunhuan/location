import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddModule } from './add/add.module';
import { EditModule } from './edit/edit.module';
import { ModalsComponent } from './modals.component';

const modules = [
  SharedModule, AddModule, EditModule
];
@NgModule({
  imports: [...modules],
  declarations: [ModalsComponent],
  exports: [ModalsComponent],
  providers: []
})

export class ModalsModule {}