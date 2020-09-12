import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
    dateInput: 'DD MMMM',
    monthYearLabel: 'MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM',
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
  chosenDate: any; // choosen day
  @Output() choosenDay = new EventEmitter<Date>(); // choosen day API
  @Output() calendarOpened = new EventEmitter<boolean>(); // calendar open/close state API
  @Input() dayOffList: Date[] = [];
  @Input() trainingDayList: Date[] = [];
  @Input() disabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.chosenDate = new FormControl(new Date()).value;
    const date = moment(this.chosenDate).toDate();
    if (this.isDayOff(date)) {
      this.chosenDate = undefined; // default date can't be day-off
      console.log('day off!');
    }
    const event = {target: {value: this.chosenDate}};
    // default day should be passed out
    this.dateChanged(event);
  }

  // prevent days-off and future days from being selected
  weekendFilter = (d: Date | null): boolean => {
    const date = moment(d).toDate();
    return !this.isDayOff(date) && (date.getDate() <= new Date().getDate());
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = moment(d).toDate();
    // highlight days-off
    if (this.isDayOff(date)) {
      return 'day-off-class';
    }
    // fill days after 24 with grey
    // TODO: should be input parameter
    if (date.getDate() > 24) {
      return 'grey-day-class';
    }
    // fill trainings days with green
    for (const trainingDay of this.trainingDayList) {
      if (date.getDate() === trainingDay.getDate() && trainingDay.getMonth() === date.getMonth()) {
        return 'days-with-exercises-class';
      }
    }
    return '';
  }

  dateChanged($event: any): void {
    if($event.target.value === undefined) {
      this.choosenDay.emit(undefined);
      return;
    }
    const date = moment($event.target.value).toDate();
    this.choosenDay.emit(date);
  }

  open(isOpend: boolean): void {
    this.calendarOpened.emit(isOpend);
  }

  private isDayOff(date: Date): boolean {
    const dayOf = this.dayOffList.find(dayOff => date.getDate() === dayOff.getDate() && date.getMonth() === dayOff.getMonth());
    return dayOf !== undefined ? true: false;
  }

}

@Component({
  selector: 'app-sprint-calendar-header',
  template: '<div><br></div>',
  encapsulation: ViewEncapsulation.None
})
export class SprintCalendarHeaderComponent {
}
