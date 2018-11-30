import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SayingComponent} from "./saying/saying.component";

const routes: Routes = [
  {path:'hello', component: SayingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
