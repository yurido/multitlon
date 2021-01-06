import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SprintComponent} from './sprint/sprint.component';
import {LoginComponent} from './login/login.component';
import {EditExerciseComponent} from './edit-exercise/edit-exercise.component';
import {Exercise} from './models/exercise';
import {NewExerciseComponent} from './new-exercise/new-exercise.component';
import {ChangeDaysOffComponent} from './change-days-off/change-days-off.component';

const routes: Routes = [
  {path: 'sprint', component: SprintComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sprint/editExercise', component: EditExerciseComponent},
  {path: 'sprint/newExercise', component: NewExerciseComponent},
  {path: 'sprint/addDaysOff', component: ChangeDaysOffComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
