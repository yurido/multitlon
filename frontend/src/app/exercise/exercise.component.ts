import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {SprintService} from '../services/sprint.service';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {MultiTError} from '../models/multiterror';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ModalDialogComponent} from '../modal.dialog/modal.dialog.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faTrash = faTrash;
  faPlus = faPlus;
  error: any;
  exercise: Exercise;
  statistic: ExerciseStatistic | undefined;
  exerciseMetadata: ExerciseMetadata | undefined;
  conditions = {
    loading: false,
    modified: false,
    initialized: false,
    canSave: false
  };

  constructor(private router: Router, private sprintService: SprintService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    // TODO: use sprintService instead
    // tslint:disable-next-line:max-line-length
    if (history.state.ex === undefined || history.state.ex === null) {
      this.back();
      return;
    }
    // TODO: use sprintService instead
    this.exercise = new Exercise().deserialize(history.state.ex);

    const exStat = this.sprintService.getExerciseStatisticsForCurrentSprint(false);
    const exMetadata = this.sprintService.getExerciseMetadata();

    forkJoin([exStat, exMetadata]).subscribe(
      result => {
        if (result[0] === undefined || result[1] === undefined) {
          this.back();
          return;
        }

        this.statistic = result[0].find(stat => stat.getSid() === this.exercise.getSid());
        if (this.statistic === undefined) {
          this.handleError(new MultiTError(`Statistic for exercise ${this.exercise.getSid()} is not loaded`));
        }
        this.exerciseMetadata = result[1].find(ex => ex.getSid() === this.exercise.getSid());
        if(this.exerciseMetadata === undefined) {
          this.handleError(new MultiTError(`Config for exercise ${this.exercise.getSid()} is not loaded`));
        }
        this.conditions.loading = false;
        this.conditions.initialized = true;
      },
      error => this.handleError(error)
    );
  }

  onExerciseChanged(exercise: Exercise): void {
    this.exercise.setReps(exercise.getReps());
    this.exercise.setRawPoints(exercise.getRawPoints());
    this.conditions.canSave = this.canSaveF();
  }

  getBodyMinHeight(): number {
    return this.sprintService.getContainerHeightForActionButton() - 40;
  }

  // TODO: use sprintService instead
  back(): void {
    // tslint:disable-next-line:max-line-length
    const state = {
      state: {
        isExerciseModified: this.conditions.modified
      }
    };
    this.router.navigate(['/sprint'], state);
  }

  /**
  * To delete exercise from current sprint
  **/
  delete(): void {
    const modalDialogConfig = this.sprintService.getModalDialogConfig();
    modalDialogConfig.data.text = 'Do you want to delete?';
    const dialogRef = this.dialog.open(ModalDialogComponent, modalDialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.conditions.loading = true;
          this.sprintService.deleteSprintExercise(this.exercise.getId()).subscribe(
            data => {
              this.conditions.modified = true;
              this.sprintService.deleteSprintExerciseInCache(this.exercise);
              const modalDialogRef = this.dialog.open(ConfirmationModalComponent, this.sprintService.getConfirmationModalDialogConfig());
              modalDialogRef.afterClosed().subscribe(
                confResp => {
                  this.conditions.loading = false;
                  this.back();
                }
              );
            },
            error => this.handleError(error)
          );
        }
      });
  }

  save(): void {
    this.conditions.loading = true;

    this.sprintService.updateExercise(this.exercise).subscribe(
      data => {
        this.exercise = data;
        console.log('updateExercise resp=', data);
        this.sprintService.getExerciseStatisticForCurrentSprint(this.exercise.getSid()).subscribe(
          response => {
            this.statistic = response;
            this.sprintService.updateSprintExerciseInCache(this.exercise);
            const modalDialogRef = this.dialog.open(ConfirmationModalComponent, this.sprintService.getConfirmationModalDialogConfig());
            modalDialogRef.afterClosed().subscribe(
              confResp => {
                this.conditions.loading = false;
                this.conditions.canSave = false;
              }
            );
            this.conditions.modified = true;
          },
          error => this.handleError(error)
        );
      },
      error => this.handleError(new MultiTError('It was an error during updating exercise, please try later'))
    );
  }

  calcQuotaColor(): string {
    if (this.conditions.loading) {
      return 'quota-disabled';
    }

    if (this.statistic !== undefined && this.statistic.getQuota() < 26) {
      return 'quota-green';
    } else if (this.statistic !== undefined && this.statistic.getQuota() >= 26 && this.statistic.getQuota() < 31) {
      return 'quota-yellow';
    } else {
      return 'quota-red';
    }
  }

  private canSaveF(): boolean {
    if(this.exerciseMetadata === undefined) {
      return false;
    }
    if(this.exerciseMetadata.isWithReps()) {
      if(this.exercise.getReps().length > 0 && !this.sprintService.isEmptyReps(this.exercise)) {
        return true;
      }
      return false;
    }
    return this.exercise.getRawPoints() > 0;
  }

  private handleError(error: any): void {
    this.conditions.loading = true;
    this.error = error;
  }
}
