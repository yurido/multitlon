import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {Exercise} from '../models/exercise';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin} from 'rxjs';
import {ExerciseSidName} from '../models/exercise.sid.name';

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
  newExercises: ExerciseSidName[] = [];
  chosenExercise: ExerciseSidName;
  defaultExercise: ExerciseSidName = new ExerciseSidName('', 'exercises...');
  private availableExerciseList: ExerciseSidName[] = [];
  myWindow = {height: 0, weight: 0};

  constructor(private router: Router, private sprintService: SprintService) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    this.chosenExercise = this.defaultExercise;
    this.myWindow.height = window.innerHeight;
    this.myWindow.weight = window.innerWidth;

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

    // build sprint available exercise list
    const metadataObs = this.sprintService.getExerciseMetadata();
    const availableExObs = this.sprintService.getSprintAvailableExercises();
    forkJoin([metadataObs, availableExObs]).subscribe(
      result => {
        this.exerciseConfig = result[0];
        if (result[1] !== undefined && result[1].length > 0) {
          result[1].forEach(sid => {
            const exObj = this.exerciseConfig.find(value => value.getSid() === sid);
            if (exObj !== undefined) {
              this.availableExerciseList.push(new ExerciseSidName(exObj.getSid(), exObj.getName()));
            }
          });
          this.newExercises = Object.assign([], this.availableExerciseList);
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
  }

  canSave(): boolean {
    return false;
  }

  onNewDate(date: Date): void {
    this.date = date;
    this.newExercises = Object.assign([], this.availableExerciseList);
    if (date !== undefined && this.sprint !== undefined) {
      const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === date.getDate());
      this.choosenDayExercises = exercises !== undefined ? exercises.getExercises() : [];
      // update available exercise list, exclude exercises which are already exist in the chosen day
      if (this.choosenDayExercises.length > 0) {
        for (const ex of this.choosenDayExercises) {
          const index = this.newExercises.findIndex(value => value.getSid() === ex.getSid());
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

  chooseExercise(ex: ExerciseSidName): void {
    if (ex !== null && ex !== undefined) {
      this.chosenExercise = ex;
    }
  }

  private handleError(error: any): void {
    this.conditions.loading = true;
    this.error = error;
  }
}
