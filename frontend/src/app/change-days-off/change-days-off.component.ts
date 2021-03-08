import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
import {forkJoin, Subject} from 'rxjs';
import {SprintExercise} from '../models/sprint.exercise';
import {SprintDay} from '../models/sprint.day';

@Component({
  selector: 'app-change-days-off',
  templateUrl: './change-days-off.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangeDaysOffComponent implements OnInit {
  conditions = {
    loading: false,
    canSave: false,
    modified: false,
    initialized: false,
    exercisesLoaded: false
  };
  faChevronLeft = faChevronLeft;
  sprint: number[][][];
  daysOff: number[] = [];
  trainingDays: number[] = [];
  private sprintExercises: SprintExercise[];
  private sprintExercisesLoadedEmitter = new Subject<Boolean>();

  constructor(private sprintService: SprintService, private router: Router) { }

  ngOnInit(): void {
    this.conditions.loading = true;

    this.sprintExercisesLoadedEmitter.subscribe(
      result => {
        // update calendar with days-off and trainings days
        console.log('sprint exercises loaded!');
        this.sprintExercises.forEach( sprintEx => {
          const exerciseDay = new Date(sprintEx.getSprintDay().getSDate()).getDate();
          // find a day in calendar
          for(var i=0; i < this.sprint.length; i++) {
            const index = this.sprint[i].findIndex(day => day[0] === exerciseDay);
            if (index > -1) {
              if(sprintEx.getSprintDay().getIsDayOff()) {
                this.sprint[i][index][1] = 0; // day-off
              } else if(sprintEx.getExercises().length > 0) {
                this.sprint[i][index][1] = 1; // training day
              }
              break;
            }
          }
        });

        this.conditions.loading = false;
        this.conditions.initialized = true;

        console.log('sprint calendar after update:', this.sprint);
      }
    );

    const date = '' + moment().format('YYYY') + moment().format('MM') + '01';
    console.log('current year and month: ',  date);
    console.log('the 1st day in this month: ', moment(date).day());
    console.log('days in this month: ', moment().daysInMonth());

    // building current sprint calendar
    this.sprint = [];
    let weekIndex = 0;
    let firstDayOfMonth = moment(date).day();
    if(firstDayOfMonth === 0) {
      firstDayOfMonth = 7; // sunday
    }
    let lastDayInTheWeek = 0;
    const lastDayInMonth = moment().daysInMonth();

    // the first week
    this.sprint[weekIndex] = [];
    for(var i=1; i<8; i++) {
      if(i<firstDayOfMonth){
        this.sprint[weekIndex].push([-1, -1]); // empty day
        continue;
      }
      lastDayInTheWeek = i-firstDayOfMonth+1;
      this.sprint[weekIndex].push([lastDayInTheWeek, -1]); // date, neutral day
    }

    // the second, thurd and fourth weeks
    for(var j=1; j<4; j++) {
      weekIndex = j;
      this.sprint[weekIndex] = [];
      for(var i=1; i<8; i++) {
        lastDayInTheWeek=lastDayInTheWeek+1;
        this.sprint[weekIndex].push([lastDayInTheWeek, -1]); // date, neutral day
      }
    }

    // the fifth week
    if(lastDayInTheWeek < lastDayInMonth) {
      weekIndex = 4;
      this.sprint[weekIndex] = [];
      const lastIndex = lastDayInMonth - lastDayInTheWeek;
      for(var i=1; i<=lastIndex; i++) {
        lastDayInTheWeek=lastDayInTheWeek+1;
        this.sprint[weekIndex].push([lastDayInTheWeek, -1]); // date, neutral day
      }
    }

    console.log('raw sprint days=', this.sprint);
    this.loadSprintExercises();
  }

  back(): void {
    this.sprintService.setSprintModified(this.conditions.modified);
    this.router.navigate(['/sprint']);
  }

  /************************* PRIVATE METHODS ***********************/
  private loadSprintExercises(): void {
    this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
      data => {
        if (data === undefined || data.length === 0) {
          const exerciseListObs = this.sprintService.getExerciseListForCurrentSprint();
          const daysOffObs = this.sprintService.getDaysOffForCurrentSprint();
          forkJoin([exerciseListObs, daysOffObs]).subscribe(
            result => {
              this.sprintExercises = this.sprintService.buildSprintExerciseList(result[0], result[1]);
              // to emit event
              this.sprintExercisesLoadedEmitter.next(true);
            },
            error => this.sprintService.handleError(error)
          );
        } else {
          this.sprintExercises = data;
          // to emit event
          this.sprintExercisesLoadedEmitter.next(true);
        }
      }
    );
  }

}
