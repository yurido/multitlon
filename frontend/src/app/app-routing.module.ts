import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivitiesComponent} from './activities/activities.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: 'activities', component: ActivitiesComponent},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
