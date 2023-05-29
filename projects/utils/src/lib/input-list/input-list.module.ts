import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputListComponent } from './input-list.component';
import { OptionsEmpty } from './empty-options.pipe';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    InputListComponent,
    OptionsEmpty
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule
  ],
  exports: [
    InputListComponent,
    OptionsEmpty
  ]
})
export class InputListModule { }
