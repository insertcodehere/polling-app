import { NgModule } from "@angular/core";

import { EmptyListComponent } from "./empty-list.component";



const EXPORTS = [
  EmptyListComponent
];

@NgModule({
  declarations: [
    ...EXPORTS
  ],
  exports: [
    ...EXPORTS
  ]
})
export class EmptyListModule { }
