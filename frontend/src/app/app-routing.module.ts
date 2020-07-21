import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SprintComponent} from './sprint/sprint.component';
import {LoginComponent} from './login/login.component';
import {ExerciseComponent} from './exercise/exercise.component';
import {Exercise} from './models/exercise';
import {NewExerciseComponent} from './new-exercise/new-exercise.component';

const routes: Routes = [
  {path: 'sprint', component: SprintComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sprint/exercise', component: ExerciseComponent, data: Exercise},
  {path: 'sprint/newExercise', component: NewExerciseComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
