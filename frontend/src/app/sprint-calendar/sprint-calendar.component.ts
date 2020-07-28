import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sprint-calendar',
  templateUrl: './sprint-calendar.component.html',
  styleUrls: ['./sprint-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class SprintCalendarComponent implements OnInit {
  header = SprintCalendarHeaderComponent; // modal view header
  date: any; // choosen day
  @Output() choosenDay = new EventEmitter<Date>(); // choosen day API
  @Output() calendarOpened = new EventEmitter<boolean>(); // calendar open/close state API

  constructor() {
  }

  ngOnInit(): void {
    this.date = new FormControl(moment()).value;
    if (moment.isMoment(this.date)) {
      const date = moment(this.date).toDate().getDate();
      if (this.isDayOff(date)) {
        // this.date = undefined; // no default date
        console.log('day off!');
      }
    }
    const event = {target: {value: this.date}};
    // default day should be passed out
    this.dateChanged(event);
  }

  // prevent days-off and future days from being selected
  weekendFilter = (d: Date | null): boolean => {
    if (moment.isMoment(d)) {
      const date = moment(d).toDate().getDate();
      return !this.isDayOff(date) && (date <= new Date().getDate());
    }
    return false;
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    if (moment.isMoment(d)) {
      const date = moment(d).toDate().getDate();
      // highlight days-off
      if (this.isDayOff(date)) {
        return 'day-off-class';
      }
      // fill days after 24 with grey
      if (date > 24) {
        return 'grey-day-class';
      }
      // fill days with exercises with green
      if (date === 1 || date === 2 || date === 3 || date === 6 || date === 8 || date === 9 || date === 20 || date === 21) {
        return 'days-with-exercises-class';
      }
    }
    return '';
  }

  dateChanged($event: any): void {
    if (moment.isMoment($event.target.value)) {
      const date = moment($event.target.value).toDate();
      this.choosenDay.emit(date);
    }
  }

  open(isOpend: boolean): void {
    this.calendarOpened.emit(isOpend);
  }

  private isDayOff(date: number): boolean {
    if (date === 4 || date === 5 || date === 11 || date === 12 || date === 18 || date === 24) {
      return true;
    }
    return false;
  }

}

@Component({
  selector: 'app-sprint-calendar-header',
  template: '<div><br></div>',
  encapsulation: ViewEncapsulation.None
})
export class SprintCalendarHeaderComponent {
}
