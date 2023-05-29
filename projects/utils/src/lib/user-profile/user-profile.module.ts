import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { MaterialModule } from '../material/material.module';



export const EXPORTS = [
  UserProfileComponent
];

@NgModule({
  declarations: [
    ...EXPORTS
  ],
  imports: [
    CommonModule,

    MaterialModule
  ],
  exports: [
    ...EXPORTS
  ]
})
export class UserProfileModule { }
