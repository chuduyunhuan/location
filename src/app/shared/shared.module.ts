import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from "clarity-angular";
import { AlertIconAndTypesService } from "clarity-angular/emphasis/alert/providers/icon-and-types-service";

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
      CommonModule,
      HttpModule,
      ClarityModule.forChild()
  ],
  declarations: [PageNotFoundComponent],
  providers: [AlertIconAndTypesService],
  exports: [
      CommonModule,
      FormsModule,
      ClarityModule
  ]
})
export class SharedModule { }