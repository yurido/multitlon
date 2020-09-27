import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SprintComponent} from './sprint/sprint.component';
import {LoginComponent} from './login/login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MockHttpCalIInterceptor} from './mock.http.call.interceptor';
import {AlertComponent} from './alert/alert.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ExerciseComponent} from './exercise/exercise.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewExerciseComponent} from './new-exercise/new-exercise.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SprintCalendarHeaderComponent} from './sprint-calendar/sprint-calendar.component';
import {SprintCalendarComponent} from './sprint-calendar/sprint-calendar.component';
import { ModalDialogComponent } from './modal.dialog/modal.dialog.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ExerciseRepsComponent } from './exercise-reps/exercise-reps.component';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    LoginComponent,
    AlertComponent,
    SpinnerComponent,
    ExerciseComponent,
    ProgressBarComponent,
    NewExerciseComponent,
    SprintCalendarHeaderComponent,
    SprintCalendarComponent,
    ModalDialogComponent,
    ConfirmationModalComponent,
    ExerciseRepsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpCalIInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
