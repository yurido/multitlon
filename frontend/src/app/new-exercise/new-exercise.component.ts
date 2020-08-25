import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin} from 'rxjs';
import {RepsView} from '../models/reps.view';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

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
  choosenDayExercises: ExerciseMetadata[] = [];
  newExercises: ExerciseMetadata[] = [];
  chosenExercise: ExerciseMetadata;
  private availableExerciseList: ExerciseMetadata[] = [];
  reps: RepsView[] = [];
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(private router: Router, private sprintService: SprintService) {
  }

  ngOnInit(): void {
    this.conditions.loading = true;
    this.initDefaultExercise();

    // build sprint available exercise list
    const exerciseListFromCache = this.sprintService.getExerciseListForCurrentSprintFromCache();
    const metadataObs = this.sprintService.getExerciseMetadata();
    const availableExObs = this.sprintService.getSprintAvailableExercises();
    forkJoin([metadataObs, availableExObs, exerciseListFromCache]).subscribe(
      result => {
        if (result[2] === undefined || result[2] === null || result[2].length === 0) {
          this.cancel();
          return;
        }
        // prepare list of my exercies this sprint
        for (const sprintDay of result[2]) {
          if (sprintDay.getSprintDay().getIsDayOff()) {
            this.daysOff.push(new Date(sprintDay.getSprintDay().getSDate()));
            // tslint:disable-next-line:max-line-length
          } else if (!sprintDay.getSprintDay().getIsDayOff() && sprintDay.getExercises() !== null && sprintDay.getExercises().length > 0) {
            this.trainingDays.push(new Date(sprintDay.getSprintDay().getSDate()));
          }
        }
        this.sprint = result[2];

        if (result[1] !== undefined && result[1].length > 0) {
          result[1].forEach(sid => {
            const exObj = result[0].find(value => value.getSid() === sid);
            if (exObj !== undefined) {
              this.availableExerciseList.push(exObj);
            }
          });
          this.newExercises = Object.assign([], this.availableExerciseList);
        }
        this.conditions.loading = false;
      },
      error => this.handleError(error)
    );
  }

  private initDefaultExercise() {
    const defaultExercise = new ExerciseMetadata();
    defaultExercise.setName('exercises...');
    this.chosenExercise = defaultExercise;
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
    this.initDefaultExercise();

    if (date !== undefined && this.sprint !== undefined) {
      this.choosenDayExercises = [];
      const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === date.getDate());
      if (exercises !== undefined && exercises !== null && exercises.getExercises() !== null && exercises.getExercises().length > 0) {
        exercises.getExercises().forEach(exercise => {
          const foundMetaEx = this.availableExerciseList.find(exMeta => exercise.getSid() === exMeta.getSid());
          if (foundMetaEx !== undefined && foundMetaEx !== null) {
            // add exercise data to the chosen day
            this.choosenDayExercises.push(foundMetaEx);
            // update available exercise list, exclude exercises which are already exist in the chosen day
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
    this.conditions.cancelDisabled = opened;
  }

  chooseExercise(ex: ExerciseMetadata): void {
    if (ex !== null && ex !== undefined) {
      this.chosenExercise = ex;
      if (this.chosenExercise.isWithReps()) {
        this.reps.push(new RepsView('', ''));
      } else {
        this.reps = [];
      }
    }
  }

  changeWeight(index: number, $event: any): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getWeight());
    this.reps[index].setWeight(newValue);
    $event.target.value = newValue;
  }

  removePostfix($event: any): void {
    if ($event.target.value.length > 0) {
      $event.target.value = this.sprintService.getNumberFromString($event.target.value);
    }
  }

  addPostfix(postfix: string, $event: any): void {
    $event.target.value = $event.target.value + ($event.target.value.length > 0 ? postfix : '');
  }

  changeReps(index: number, $event: any): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getReps());
    this.reps[index].setReps(newValue);
    $event.target.value = newValue;
  }

  deleteReps(index: number): void {
    this.reps.splice(index, 1);
  }

  noEmptyReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === '' || element.getReps() === '');
    return emptyElements === -1;
  }

  addReps(): void {
    const rep = new RepsView('', '');
    this.reps.push(rep);
  }

  private handleError(error: any): void {
    this.conditions.loading = true;
    this.error = error;
  }

  private modifyRepsElement(newValue: string, oldValue: string): string {
    if (oldValue !== newValue) {
    }
    const newNumberValue = this.sprintService.getNumberFromString(newValue);
    return (newNumberValue === 0 ? '' : '' + newNumberValue);
  }
}
