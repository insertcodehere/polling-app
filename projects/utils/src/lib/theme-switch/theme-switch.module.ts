import { NgModule } from "@angular/core";

import { MaterialModule } from "../material/material.module";
import { ThemeSwitchComponent } from "./theme-switch.component";



const EXPORTS = [
  ThemeSwitchComponent
];

@NgModule({
  declarations: [
    ...EXPORTS
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    ...EXPORTS
  ]
})
export class ThemeSwitchModule { }
