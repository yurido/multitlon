import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SayingComponent} from './saying/saying.component';
import {ActivitiesComponent} from './activities/activities.component';

const routes: Routes = [
  {path: 'hello', component: SayingComponent},
  {path: 'activities', component: ActivitiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
