import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {SprintService} from '../services/sprint.service';
import {ExerciseProgress} from '../models/exercise.progress';
import {MultiTError} from '../models/multiterror';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ModalDialogComponent} from '../modal.dialog/modal.dialog.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditExerciseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faTrash = faTrash;
  faPlus = faPlus;
  exercise: Exercise;
  progress: ExerciseProgress | undefined;
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
    const ex = this.sprintService.getExerciseFromCache();

    if (ex === undefined) {
      this.back();
      return;
    }
    this.exercise = ex;

    const sprintProgressData = this.sprintService.getCurrentSprintProgress(false);
    const exMetadata = this.sprintService.getExerciseMetadata();

    forkJoin([sprintProgressData, exMetadata]).subscribe(
      result => {
        if (result[0] === undefined || result[1] === undefined) {
          this.back();
          return;
        }

        this.progress = result[0].find(stat => stat.getSid() === this.exercise.getSid());
        if (this.progress === undefined) {
          this.sprintService.handleError(new MultiTError(`Progress for exercise ${this.exercise.getSid()} is not loaded`));
        }
        this.exerciseMetadata = result[1].find(ex => ex.getSid() === this.exercise.getSid());
        if(this.exerciseMetadata === undefined) {
          this.sprintService.handleError(new MultiTError(`Config for exercise ${this.exercise.getSid()} is not loaded`));
        }
        this.conditions.loading = false;
        this.conditions.initialized = true;
      },
      error => this.sprintService.handleError(error)
    );
  }

  onExerciseChanged(exercise: Exercise): void {
    this.exercise.setReps(exercise.getReps());
    this.exercise.setRawPoints(exercise.getRawPoints());
    this.conditions.canSave = this.canSaveF();
  }

  getBodyMinHeight(): number {
    return this.sprintService.getContainerHeightForActionButton() - 30;
  }

  back(): void {
    this.sprintService.setSprintModified(this.conditions.modified);
    this.router.navigate(['/sprint']);
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
      });
  }

  save(): void {
    this.conditions.loading = true;

    this.sprintService.updateExercise(this.exercise).subscribe(
      data => {
        this.exercise = data;
        this.sprintService.getExerciseProgress(this.exercise.getSid()).subscribe(
          response => {
            this.progress = response;
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
          error => {
            const modalDialogRef = this.sprintService.handleError(error);
            modalDialogRef.afterClosed().subscribe(
              (confResp: any) => {
                this.conditions.loading = false;
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

  calcQuotaColor(): string {
    if (this.conditions.loading) {
      return 'quota-disabled';
    }

    if (this.progress !== undefined && this.progress.getQuota() < 26) {
      return 'quota-green';
    } else if (this.progress !== undefined && this.progress.getQuota() >= 26 && this.progress.getQuota() < 31) {
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
}
