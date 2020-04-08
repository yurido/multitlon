import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SprintComponent} from './sprint/sprint.component';
import {MainComponent} from './main/main.component';
import {ExerciseComponent} from './exercise/exercise.component';
import {Exercise} from './models/exercise';

const routes: Routes = [
  {path: 'sprint', component: SprintComponent},
  {path: 'main', component: MainComponent},
  {path: 'exercise', component: ExerciseComponent, data: Exercise},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
