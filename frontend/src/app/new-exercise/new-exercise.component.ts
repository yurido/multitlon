import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {forkJoin} from 'rxjs';
import {RepsView} from '../models/reps.view';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Exercise} from '../models/exercise';
import {Reps} from '../models/reps';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewExerciseComponent implements OnInit {
  error: any;
  conditions = {
    isAdded: false,
    loading: false,
    clendarOpened: false,
    initialized: false
  };
  chosenDate: Date;
  daysOff: Date[] = [];
  trainingDays: Date[] = [];
  private sprint: SprintExercise[] = [];
  chosenDayExercises: Exercise[] = [];
  newExercises: ExerciseMetadata[] = [];
  chosenExercise: ExerciseMetadata;
  private availableExerciseList: ExerciseMetadata[] = [];
  reps: RepsView[] = [];
  faTrash = faTrash;
  faPlus = faPlus;
  rawPoints: number | undefined;
  faChevronLeft = faChevronLeft;
  totalPointsDay: number | undefined;

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
        // show exercises for today
        this.onNewDate(this.chosenDate);
        this.conditions.loading = false;
        this.conditions.initialized = true;
      },
      error => this.handleError(error)
    );
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
    this.conditions.loading = true;
    const ex = this.createExercise();
    this.sprintService.addExerciseToSprint(ex).subscribe(
      data => {
        this.chosenDayExercises.push(data);
        // update available exercise list, exclude added exercise
        const index = this.newExercises.findIndex(value => value.getSid() === ex.getSid());
        if (index > -1) {
          this.newExercises.splice(index, 1);
        }

        this.sprintService.addSprintExerciseToCache(data).subscribe(
          resp => {
            this.initDefaultExercise();
            this.reps = [];
            this.rawPoints = undefined;
            // add new training day to calendar
            this.addNewTrainingDay();
            // refresh exercises
            this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
              exResponse => {
                this.sprint = exResponse;
                this.conditions.loading = false;
                this.conditions.isAdded = true;
                this.getSprintExercises(this.chosenDate);
              }
            );
          }
        );
      },
      error => this.handleError(error)
    );
  }

  canSave(): boolean {
    // tslint:disable-next-line:max-line-length
    return this.chosenExercise.getSid() !== undefined &&
      (this.chosenExercise.isWithReps() && this.reps.length > 0 && this.noEmptyReps()) ||
      (!this.chosenExercise.isWithReps() && this.rawPoints !== undefined && this.rawPoints > 0);
  }

  onNewDate(date: Date): void {
    this.chosenDate = date;
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

  choseExercise(ex: ExerciseMetadata): void {
    if (ex !== null && ex !== undefined) {
      this.reps = [];
      this.chosenExercise = ex;
      if (this.chosenExercise.isWithReps()) {
        this.reps.push(new RepsView('', ''));
      }
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

  /* --------------------------------------- REPS table -----------------------  */
  changeWeight(index: number, $event: any): void {
    const newValue = this.changeFieldFloatValue($event);
    this.reps[index].setWeight(newValue);
    $event.target.value = newValue;
  }

  changeReps(index: number, $event: any): void {
    const newNumberValue = this.sprintService.getNumberFromString($event.target.value);
    const newStringValue = (newNumberValue === 0 ? '' : '' + newNumberValue);
    this.reps[index].setReps(newStringValue);
    $event.target.value = newStringValue;
  }

  deleteReps(index: number): void {
    if (this.reps.length === 1) {
      this.reps = [new RepsView('', '')];
      return;
    }
    this.reps.splice(index, 1);
  }

  noEmptyReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === '' || element.getReps() === '' || element.getWeight() === '0' || element.getReps() === '0' || element.getWeight() === undefined);
    return emptyElements === -1;
  }

  addReps(): void {
    const rep = new RepsView('', '');
    this.reps.push(rep);
  }

  changeRawPoints($event: any): void {
    this.rawPoints = this.changeFieldFloatValue($event);
  }

  private changeFieldFloatValue($event: any): any {
    const str = $event.target.value.toString();
    if (str === '' || str == undefined) {
      return '';
    }
    if (str.endsWith('.')) {
      return $event.target.value;
    }
    $event.target.value = this.sprintService.getFloatFromString($event.target.value);
    return $event.target.value;
  }
  /* --------------------------------------- REPS table -----------------------  */

  private handleError(error: any): void {
    this.conditions.loading = true;
    this.error = error;
  }

  private getSprintExercises(date: Date): Exercise[] {
    const exercises = this.sprint.find(value => new Date(value.getSprintDay().getSDate()).getDate() === this.chosenDate.getDate());
    if (exercises !== undefined && exercises !== null && exercises.getExercises() !== null && exercises.getExercises().length > 0) {
      this.totalPointsDay = exercises.getSprintDay().getTotal();
      return exercises.getExercises();
    }
    return [];
  }

  private initDefaultExercise() {
    const defaultExercise = new ExerciseMetadata();
    defaultExercise.setName('exercises...');
    this.chosenExercise = defaultExercise;
  }

  private createExercise(): Exercise {
    const ex = new Exercise();
    ex.setDate(this.chosenDate.getTime());
    ex.setSid(this.chosenExercise.getSid());
    if (this.chosenExercise.isWithReps()) {
      this.reps.forEach(rep => {
        const newRep = new Reps();
        newRep.setWeight(this.sprintService.getFloatFromString(rep.getWeight()));
        newRep.setReps(this.sprintService.getNumberFromString(rep.getReps()));
        ex.getReps().push(newRep);
        ex.setRawPoints(0);
      });
    } else {
      // @ts-ignore
      ex.setRawPoints(this.rawPoints !== undefined ? this.rawPoints : 0);
      ex.setReps([]);
    }
    return ex;
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
}
