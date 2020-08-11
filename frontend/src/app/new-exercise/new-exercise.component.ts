import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {Exercise} from '../models/exercise';
import {MultiTError} from '../models/multiterror';
import {ExerciseMetadata} from '../models/exercise.metadata';

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
  private exerciseConfig: ExerciseMetadata[];
  newExercises: string[] = [];
  choosenExercise: string;
  private availableExerciseList: string[] = [];

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

    this.sprintService.getExerciseMetadata().subscribe(
      data => {
        this.exerciseConfig = data;
        this.conditions.loading = false;
      },
      error => this.handleError(new MultiTError('Metadata not loaded!'))
    );
    // TODO: change to dynamical load
    this.availableExerciseList = ['ABS', 'TRICEPS', 'OVERHEAD_PRESS', 'SWIM', 'RUN'];
    this.newExercises = Object.assign([], this.availableExerciseList);
    this.choosenExercise = 'exercises...';
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
    const condis = true;
    return condis;
  }

  onNewDate(date: Date): void {
    this.date = date;
    this.newExercises = Object.assign([], this.availableExerciseList);
    if (date !== undefined && this.sprint !== undefined) {
      const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === date.getDate());
      this.choosenDayExercises = exercises !== undefined ? exercises.getExercises() : [];
      // update available exercise list, exclude exercises which are already exist in the choosen day
      if (this.choosenDayExercises.length > 0) {
        for (const ex of this.choosenDayExercises) {
          const index = this.newExercises.findIndex(value => value === ex.getSid());
          if (index > -1) {
            this.newExercises.splice(index, 1);
          }
        }
      }
    }
  }

  onCalendarOpen(opened: boolean): void {
    this.conditions.cancelDisabled = opened;
  }

  getExName(sid: string): string {
    const exerciseObj = this.exerciseConfig.find(value => value.getSid() === sid);
    return (exerciseObj !== undefined && exerciseObj !== null) ? exerciseObj.getName() : '';
  }

  chooseExercise(sid: string): void {
    this.choosenExercise = this.getExName(sid);
  }

  private handleError(error: any): void {
    this.conditions.loading = false;
    this.error = error;
  }
}
