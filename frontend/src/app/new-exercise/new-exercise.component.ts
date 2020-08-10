import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from "../models/sprint.exercise";
import {Exercise} from "../models/exercise";

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
    loading: false,
    cancelDisabled: false
  };
  date: any;
  daysOff: Date[] = [];
  trainingDays: Date[] = [];
  private sprint: SprintExercise[] = [];
  choosenDayExercises: Exercise[] = [];

  constructor(private router: Router, private sprintService: SprintService) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
      data => {
        // tslint:disable-next-line:max-line-length
        if (data !== undefined && data !== null && data.length > 0) {
          for (const sprintDay of data) {
            if (sprintDay.getSprintDay().getIsDayOff()) {
              this.daysOff.push(new Date(sprintDay.getSprintDay().getSDate()));
              // tslint:disable-next-line:max-line-length
            } else if (!sprintDay.getSprintDay().getIsDayOff() && sprintDay.getExercises() !== null && sprintDay.getExercises().length > 0) {
              this.trainingDays.push(new Date(sprintDay.getSprintDay().getSDate()));
            }
          }
          this.sprint = data;
        } else {
          this.cancel();
        }
        this.conditions.loading = false;
      },
      error => this.handleError(error)
    );
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
    console.log('date=', this.date);
  }

  canSave(): boolean {
    const condis = true;
    return condis;
  }

  onNewDate(date: Date): void {
    console.log('choosen day=', date);
    this.date = date;
    if (date !== undefined && this.sprint !== undefined) {
      const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === date.getDate());
      this.choosenDayExercises = exercises !== undefined ? exercises.getExercises() : [];
    }
  }

  onCalendarOpen(opened: boolean): void {
    this.conditions.cancelDisabled = opened;
  }

  private handleError(error: any): void {
    this.conditions.loading = false;
    this.error = error;
  }
}
