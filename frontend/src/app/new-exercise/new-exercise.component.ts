import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin, Subject} from 'rxjs';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Exercise} from '../models/exercise';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import { startWith, tap, delay } from 'rxjs/operators';
import {MultiTError} from '../models/multiterror';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewExerciseComponent implements OnInit {
  conditions = {
    isAdded: false,
    loading: false,
    clendarOpened: false,
    initialized: false,
    canSave: false
  };
  chosenDate: Date;
  daysOff: Date[] = [];
  trainingDays: Date[] = [];
  chosenDayExercises: Exercise[] = [];
  newExercises: ExerciseMetadata[] = [];
  chosenExerciseMetadata: ExerciseMetadata;
  private sprint: SprintExercise[] = [];
  private availableExerciseList: ExerciseMetadata[] = [];
  private exercise: Exercise;
  faTrash = faTrash;
  faPlus = faPlus;
  faChevronLeft = faChevronLeft;
  totalPointsDay: number | undefined;

  constructor(private router: Router, private sprintService: SprintService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    this.initDefaultExercise();
    this.totalPointsDay = undefined;

    const metadata = this.sprintService.getExerciseMetadata();
    const availableExercises = this.sprintService.getSprintAvailableExercises();

    forkJoin([metadata, availableExercises]).subscribe(
      result => {
        if(result[0] === undefined || result[1] === undefined) {
          this.sprintService.handleError(new MultiTError('Sprint metadata isn\'t loaded'));
          return;
        }

        // prepare list of available exercises for this sprint
        if (result[1] !== undefined && result[1].length > 0) {
          result[1].forEach(sid => {
            const exObj = result[0].find(value => value.getSid() === sid);
            if (exObj !== undefined) {
              this.availableExerciseList.push(exObj);
            }
          });
          this.newExercises = Object.assign([], this.availableExerciseList);
        }
        this.loadExercises();
      },
      error => this.sprintService.handleError(error)
    );
  }

  getBodyMinHeight(): number {
    return this.sprintService.getContainerHeightForActionButton();
  }

  back(): void {
    this.sprintService.setSprintModified(this.conditions.isAdded);
    this.router.navigate(['/sprint']);
  }

  save(): void {
    this.conditions.loading = true;
    this.sprintService.addExerciseToSprint(this.exercise).subscribe(
      data => {
        this.chosenDayExercises.push(data);
        // update available exercise list, exclude added exercise
        const index = this.newExercises.findIndex(value => value.getSid() === this.exercise.getSid());
        if (index > -1) {
          this.newExercises.splice(index, 1);
        }

        this.sprintService.addSprintExerciseToCache(data).subscribe(
          resp => {
            this.initDefaultExercise();
            // add new training day to calendar
            this.addNewTrainingDay();
            // refresh exercises
            this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
              exResponse => {
                this.sprint = exResponse;

                this.conditions.isAdded = true;
                this.getSprintExercises(this.chosenDate);

                const modalDialogRef = this.dialog.open(ConfirmationModalComponent, this.sprintService.getConfirmationModalDialogConfig());
                modalDialogRef.afterClosed().subscribe(
                  confResp => {
                    this.conditions.loading = false;
                    this.conditions.canSave = false;
                  }
                );
              }
            );
          }
        );
      },
      error => {
        const modalDialogRef = this.sprintService.handleError(error);
        modalDialogRef.afterClosed().subscribe(
          (confResp: any) => {
            this.conditions.loading = false;
          }
        );
      }
    );
  }

  onNewDate(date: Date): void {
    this.chosenDate = date;
    console.log('OnNewDate event ', date);
    this.newExercises = Object.assign([], this.availableExerciseList);
    this.initDefaultExercise();

    if (date !== undefined && this.sprint !== undefined) {
      this.chosenDayExercises = [];
      const exercises = this.getSprintExercises(date);
      if (exercises.length >0) {
        exercises.forEach(exercise => {
          const foundMetaEx = this.availableExerciseList.find(exMeta => exercise.getSid() === exMeta.getSid());
          if (foundMetaEx !== undefined && foundMetaEx !== null) {
            // add exercise data to the chosen day
            this.chosenDayExercises.push(exercise);
            // update available exercise list, exclude exercises which already exist in the chosen day
            const index = this.newExercises.findIndex(value => value.getSid() === foundMetaEx.getSid());
            if (index > -1) {
              this.newExercises.splice(index, 1);
            }
          }
        });
      }
    }
  }

  onCalendarOpen(opened: boolean): void {
    this.conditions.clendarOpened = opened;
  }

  choseExercise(meta: ExerciseMetadata): void {
    if (meta !== null && meta !== undefined) {
      this.chosenExerciseMetadata = meta;
    }
  }

  getExerciseName(sid: string): string {
    if (sid !== null && sid !== undefined) {
      const foundMetaEx = this.availableExerciseList.find(exMeta => sid === exMeta.getSid());
      if(foundMetaEx !== null && foundMetaEx !== undefined) {
        return foundMetaEx.getName();
      }
    }
    return '';
  }

  onExerciseChanged(exercise: Exercise): void {
    this.exercise = exercise;
    this.exercise.setDate(this.chosenDate.getTime());
    this.conditions.canSave = this.canSaveF();
  }

  private getSprintExercises(date: Date): Exercise[] {
    const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === this.chosenDate.getDate());
    if (exercises !== undefined && exercises !== null && exercises.getExercises() !== null && exercises.getExercises().length > 0) {
      this.totalPointsDay = exercises.getSprintDay().getTotal();
      return exercises.getExercises();
    }
    this.totalPointsDay = undefined;
    return [];
  }

  private initDefaultExercise() {
    const defaultExercise = new ExerciseMetadata();
    defaultExercise.setName('exercises...');
    this.chosenExerciseMetadata = defaultExercise;
  }

  private addNewTrainingDay(): void {
    if(this.trainingDays.length === 0) {
      this.trainingDays.push(this.chosenDate);
      return;
    }
    const trainingDay = this.trainingDays.find(date => date.getDate() === this.chosenDate.getDate());
    if (trainingDay === null || trainingDay === undefined) {
      this.trainingDays.push(this.chosenDate);
    }
  }

  private canSaveF(): boolean {
    // tslint:disable-next-line:max-line-length
    if (this.exercise === undefined || this.chosenExerciseMetadata === undefined) {
      return false;
    }
    // tslint:disable-next-line:max-line-length
    if(this.exercise.getSid() === undefined ||this.exercise.getDate() === undefined) {
      return false;
    }
    if(this.chosenExerciseMetadata.isWithReps()) {
      if(this.exercise.getReps().length > 0 && !this.sprintService.isEmptyReps(this.exercise)) {
        return true;
      }
      return false;
    }
    return this.exercise.getRawPoints() > 0;
  }

  private prepareDaysOffAndTrainingDays(): void {
    // prepare days-off and training days
    this.sprint.forEach(sprintDay => {
      if (sprintDay.getSprintDay().getIsDayOff()) {
        this.daysOff.push(new Date(sprintDay.getSprintDay().getSDate()));
        // tslint:disable-next-line:max-line-length
      } else if (!sprintDay.getSprintDay().getIsDayOff() && sprintDay.getExercises() !== null && sprintDay.getExercises().length > 0) {
        this.trainingDays.push(new Date(sprintDay.getSprintDay().getSDate()));
      }
    });
    if(!this.sprintService.isDayOff(new Date(), this.daysOff)) {
      this.chosenDate = new Date();
      this.onNewDate(this.chosenDate);
    }
  }

  private loadExercises(): void {
    this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
      data => {
        if (data === undefined || data.length === 0) {
          const exerciseList = this.sprintService.getExerciseListForCurrentSprint();
          const daysOff = this.sprintService.getDaysOffForCurrentSprint();
          forkJoin([exerciseList, daysOff]).subscribe(
            result => {
              this.sprint = this.sprintService.buildSprintExerciseList(result[0], result[1]);
              this.prepareDaysOffAndTrainingDays();

              this.conditions.loading = false;
              this.conditions.initialized = true;
            },
            error => this.sprintService.handleError(error)
          );
        } else {
          this.sprint = data;
          console.log('sprint exercises after loading from cache=', this.sprint);
          this.prepareDaysOffAndTrainingDays();

          this.conditions.loading = false;
          this.conditions.initialized = true;
        }
    });
  }
}
