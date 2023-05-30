import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from '../material/material.module';



const EXPORTS = [
  LoginComponent,
  SignUpComponent
];

@NgModule({
  declarations: [
    ...EXPORTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    MaterialModule
  ],
  exports: [
    ...EXPORTS
  ]
})
export class AuthModule { }
