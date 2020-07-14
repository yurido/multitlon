import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SprintComponent } from './sprint/sprint.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MockHttpCalIInterceptor} from './mock.http.call.interceptor';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    LoginComponent,
    AlertComponent,
    SpinnerComponent,
    ExerciseComponent,
    ProgressBarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MockHttpCalIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
