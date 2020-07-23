import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewExerciseComponent implements OnInit, OnDestroy {
  error: any;
  conditions = {
    isAdded: false,
    loading: false
  };
  calendarHeader = CalendarHeaderComponent;
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    console.log('date=', d);
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'day-off-class' : '';
  }

  constructor(private router: Router, private sprintService: SprintService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  cancel(): void {
    // tslint:disable-next-line:max-line-length
    const state = {
      state: {
        isExerciseModified: this.conditions.isAdded
      }
    };
    this.router.navigate(['/sprint'], state);
  }

  save(): void {
    // TODO: implement
  }

  canSave(): boolean {
    let condis = false;
    /* if (this.config.isWithReps()) {
      condis = (this.canAddMoreReps() && this.reps.length > 0);
    } else {
      condis = this.sprintService.isStringContainsNumbers(this.rawPoints);
    } */
    return condis;
  }
}

@Component({
  selector: 'app-calendar-header',
  template: '<div><br></div>',
  encapsulation: ViewEncapsulation.None
})
export class CalendarHeaderComponent {
}
