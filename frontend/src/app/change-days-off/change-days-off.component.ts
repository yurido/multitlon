import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

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
    initialized: false
  };
  faChevronLeft = faChevronLeft;
  sprint: number[][];

  constructor(private sprintService: SprintService, private router: Router) { }

  ngOnInit(): void {
    this.conditions.loading = true;

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
        this.sprint[weekIndex].push(-1); // empty
        continue;
      }
      lastDayInTheWeek = i-firstDayOfMonth+1;
      this.sprint[weekIndex].push(lastDayInTheWeek);
    }

    // the second, thurd and fourth weeks
    for(var j=1; j<4; j++) {
      weekIndex = j;
      this.sprint[weekIndex] = [];
      for(var i=1; i<8; i++) {
        lastDayInTheWeek=lastDayInTheWeek+1;
        this.sprint[weekIndex].push(lastDayInTheWeek);
      }
    }

    // the fifth week
    if(lastDayInTheWeek < lastDayInMonth) {
      weekIndex = 4;
      this.sprint[weekIndex] = [];
      const lastIndex = lastDayInMonth - lastDayInTheWeek;
      for(var i=1; i<=lastIndex; i++) {
        lastDayInTheWeek=lastDayInTheWeek+1;
        this.sprint[weekIndex].push(lastDayInTheWeek);
      }
    }

    console.log('sprint days=', this.sprint);

    this.conditions.loading = false;
    this.conditions.initialized = true;
  }

  back(): void {
    this.sprintService.setSprintModified(this.conditions.modified);
    this.router.navigate(['/sprint']);
  }

}
