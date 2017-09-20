import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ]
})
export class SharedModule {
}

export const MustLatitude = /^(?:-|)(?:(?:[0-9]|[1-8][0-9])?(\.\d+)?|90(\.0+)?)$/;
export const MustLongitude = /^(?:-|)(?:(?:[0-9]|[0-9][0-9]|[1][0-7][0-9])?(\.\d+)?|180(\.0+)?)$/;
