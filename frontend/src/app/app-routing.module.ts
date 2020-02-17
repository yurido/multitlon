import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SayingComponent} from './saying/saying.component';
import {ActivitiesComponent} from './activities/activities.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: 'hello', component: SayingComponent},
  {path: 'activities', component: ActivitiesComponent},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
