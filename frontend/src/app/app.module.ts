import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SprintComponent } from './sprint/sprint.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MockHttpCalIInterceptor} from './mock.http.call.interceptor';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    MainComponent,
    AlertComponent,
    SpinnerComponent,
    ExerciseComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MockHttpCalIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
