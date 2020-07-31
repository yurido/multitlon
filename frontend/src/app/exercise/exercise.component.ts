import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Reps} from '../models/reps';
import {SprintService} from '../services/sprint.service';
import {RepsView} from '../models/reps.view';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {MultiTError} from '../models/multiterror';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {ModalService} from '../services/modal.service';
import {ModalConfig} from '../models/modal.config';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit, OnDestroy {
  faChevronLeft = faChevronLeft;
  faTrash = faTrash;
  faPlus = faPlus;
  error: any;
  exercise: Exercise;
  statistic: ExerciseStatistic;
  reps: RepsView[] = [];
  config: ExerciseMetadata | undefined;
  rawPoints: string;
  conditions = {
    loading: false,
    isModifiedButNotsaved: false,
    inEditMode: false,
    isModifiedAndsaved: false
  };
  private modalWindowSubscription: Subscription;

  constructor(private router: Router, private sprintService: SprintService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    // tslint:disable-next-line:max-line-length
    if ((history.state.ex === undefined || history.state.ex === null) || (history.state.statistic === undefined || history.state.statistic === null)) {
      this.back();
      return;
    }
    // getting exercise and statistic from sprint component
    this.exercise = new Exercise().deserialize(history.state.ex);
    this.statistic = new ExerciseStatistic().deserialize(history.state.statistic);

    this.initRepsView();
    this.rawPoints = '' + this.exercise.getRawPoints();
    this.loadMetadata();
    this.conditions.loading = false;

    this.modalWindowSubscription = this.modalService.onModalWindowResponse().subscribe(config => {
      if (config.getId() === ModalService.DELETE_EXERCISE_ID && config.isAccepted) {
        this.conditions.loading = true;
        this.sprintService.deleteSprintExercise(this.exercise.getId()).subscribe(
          data => {
            this.conditions.isModifiedAndsaved = true;
            this.sprintService.deleteSprintExerciseInCache(this.exercise);
            this.back();
          },
          error =>
            this.handleError(new MultiTError('It was an error during deleting of exercise, please try later'))
        );
      }
    });
  }

  // TODO: should not be here!
  ngOnDestroy(): void {
    this.modalWindowSubscription.unsubscribe();
  }

  back(): void {
    // tslint:disable-next-line:max-line-length
    const state = {
      state: {
        isExerciseModified: this.conditions.isModifiedAndsaved
      }
    };
    this.router.navigate(['/sprint'], state);
  }

  edit(): void {
    this.conditions.inEditMode = true;
  }

  cancel(): void {
    this.conditions.inEditMode = false;
    this.conditions.isModifiedButNotsaved = false;
    this.reps = [];
    this.initRepsView();
    this.rawPoints = '' + this.exercise.getRawPoints();
  }

  delete(): void {
    this.modalService.sendMessageToModalWindow(new ModalConfig(ModalService.DELETE_EXERCISE_ID, 'Do you want to delete?', 'no', 'yes'));
  }

  save(): void {
    this.conditions.inEditMode = false;
    this.conditions.isModifiedButNotsaved = false;
    this.conditions.loading = true;

    this.exercise.setReps([]);
    this.reps.forEach(rep => {
      const newRep = new Reps();
      newRep.setWeight(this.sprintService.getNumberFromString(rep.getWeight()));
      newRep.setReps(this.sprintService.getNumberFromString(rep.getReps()));
      this.exercise.getReps().push(newRep);
    });

    this.exercise.setRawPoints(this.sprintService.getFloatFromString(this.rawPoints));
    this.sprintService.updateExercise(this.exercise)
      .subscribe(data => {
          this.conditions.isModifiedAndsaved = true;
          this.exercise = new Exercise().deserialize(data);
          this.sprintService.getExerciseStatisticForCurrentSprint(this.exercise.getSid()).subscribe(
            response => {
              this.statistic = new ExerciseStatistic().deserialize(response);
              this.conditions.loading = false;
            }, error => this.handleError(error)
          );
          this.sprintService.updateSprintExerciseInCache(this.exercise);
        }, error =>
          this.handleError(new MultiTError('It was an error during updating exercise, please try later'))
      );
  }

  addReps(): void {
    const rep = new RepsView('', '');
    this.reps.push(rep);
    this.conditions.isModifiedButNotsaved = true;
  }

  deleteReps(index: number): void {
    this.reps.splice(index, 1);
    this.conditions.isModifiedButNotsaved = true;
  }

  canAddMoreReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === '' || element.getReps() === '');
    return emptyElements === -1;
  }

  changeWeight(index: number, $event: any): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getWeight());
    this.reps[index].setWeight(newValue);
    $event.target.value = newValue;
  }

  changeReps(index: number, $event: any): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getReps());
    this.reps[index].setReps(newValue);
    $event.target.value = newValue;
  }

  changeRawPoints($event: any): void {
    if (this.rawPoints !== $event.target.value) {
      this.conditions.isModifiedButNotsaved = true;
    }
    this.rawPoints = $event.target.value;
  }

  calcQuotaColor(): string {
    if (this.conditions.loading) {
      return 'quota-disabled';
    }

    if (this.statistic.getQuota() < 26) {
      return 'quota-green';
    } else if (this.statistic.getQuota() >= 26 && this.statistic.getQuota() < 31) {
      return 'quota-yellow';
    } else {
      return 'quota-red';
    }
  }

  canSave(): boolean {
    let condis = false;
    if (this.config !== undefined && this.config.isWithReps()) {
      condis = (this.canAddMoreReps() && this.reps.length > 0);
    } else {
      condis = this.sprintService.isStringContainsNumbers(this.rawPoints);
    }
    return this.conditions.isModifiedButNotsaved && condis;
  }

  addPostfix(postfix: string, $event: any): void {
    $event.target.value = $event.target.value + ($event.target.value.length > 0 ? postfix : '');
  }

  removePostfix($event: any): void {
    if ($event.target.value.length > 0) {
      $event.target.value = this.sprintService.getNumberFromString($event.target.value);
    }
  }

  private initRepsView(): void {
    this.reps = [];
    this.exercise.getReps().forEach(reps => {
      const repsV = new RepsView(reps.getWeight() + 'kg', '' + reps.getReps());
      this.reps.push(repsV);
    });
  }

  private modifyRepsElement(newValue: string, oldValue: string): string {
    if (oldValue !== newValue) {
      this.conditions.isModifiedButNotsaved = true;
    }
    const newNumberValue = this.sprintService.getNumberFromString(newValue);
    return (newNumberValue === 0 ? '' : '' + newNumberValue);
  }

  private loadMetadata(): void {
    this.sprintService.getExerciseMetadata().subscribe(
      data => {
        const metaData = new ExerciseMetadataList().deserialize(data);
        this.config = metaData.getExerciseMetadata().find(ex => ex.getSid() === this.exercise.getSid());
      },
      error => this.handleError(new MultiTError('Exercise metadata not loaded'))
    );
  }

  private handleError(error: any): void {
    console.log('error here ', error);
    this.conditions.loading = false;
    this.error = error;
  }
}
