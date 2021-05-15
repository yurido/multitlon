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
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

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
  today: number = 0;
  private sprintExercises: SprintExercise[];
  private sprintExercisesLoadedEmitter = new Subject<Boolean>();
  private MAX_NUMBER_OF_DAYSOFF: number = 6;
  private numberOfDaysOff: number = 0;

  constructor(private sprintService: SprintService, private router: Router, public dialog: MatDialog) { }

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
      }
    );

    const date = '' + moment().format('YYYY') + moment().format('MM') + '01';

    this.today = new Date().getDate();

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
    this.numberOfDaysOff = this.MAX_NUMBER_OF_DAYSOFF;
  }

  back(): void {
    this.sprintService.setSprintModified(this.conditions.modified);
    this.router.navigate(['/sprint']);
  }

  calcBackgroundColor(weekIndex: number, dayIndex: number) {
   const backgroundColor = (this.sprint[weekIndex][dayIndex][1]===1 ? 'bgc-lightgreen':  (this.sprint[weekIndex][dayIndex][1]===0 ? 'bgc-red': (this.sprint[weekIndex][dayIndex][0]>24 ? 'bgc-gainsboro': 'bgc-white')));
   const borderColor = (this.sprint[weekIndex][dayIndex][0] === this.today ? 'border-blue': 'border-transparent');
   return backgroundColor + ' ' + borderColor;
  }

  onClick(weekIndex: number, dayIndex: number): void {
    // if red then mark it white
    if(this.sprint[weekIndex][dayIndex][1] === 0) {
      this.numberOfDaysOff = this.numberOfDaysOff - 1;
      this.sprint[weekIndex][dayIndex][1] = -1;
      this.conditions.canSave = false;
    } else if(this.sprint[weekIndex][dayIndex][1] === -1 && this.numberOfDaysOff < this.MAX_NUMBER_OF_DAYSOFF) {
      // if white and number of red less than 6 then mark it red
      this.numberOfDaysOff = this.numberOfDaysOff + 1;
      this.sprint[weekIndex][dayIndex][1] = 0;
      if(this.numberOfDaysOff === this.MAX_NUMBER_OF_DAYSOFF) {
        this.conditions.canSave = true;
      }
    }
  }

  save(): void {
    this.conditions.loading = true;
    let daysOff: number[] = [];
    const year: number = new Date().getFullYear();
    const month: number = new Date().getMonth();

    for(var i=0; i < this.sprint.length; i++) {
      for(var j=0; j < this.sprint[i].length; j++) {
        if(this.sprint[i][j][1] === 0) {
          daysOff.push(new Date(year, month, this.sprint[i][j][0]).getTime() );
        }
      }
    }

    this.sprintService.saveDaysOff(daysOff).subscribe(
      data => {
        this.sprintService.clearSprintExercisesInCache();
        const modalDialogRef = this.dialog.open(ConfirmationModalComponent, this.sprintService.getConfirmationModalDialogConfig());
        modalDialogRef.afterClosed().subscribe(
          confResp => {
            this.conditions.loading = false;
            this.conditions.canSave = false;
          }
        );
      },
      error => {
        const modalDialogRef = this.sprintService.handleError(error);
        modalDialogRef.afterClosed().subscribe(
          (confResp: any) => {
            this.conditions.canSave = false;
            this.conditions.loading = false;
          }
        );
      }
    );
  }

  getBodyMinHeight(): number {
    return this.sprintService.getContainerHeightForActionButton();
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
