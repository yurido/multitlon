import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Reps} from '../models/reps';
import {SprintService} from '../services/sprint.service';
import {RepsView} from '../models/reps.view';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faTrash = faTrash;
  faPlus = faPlus;
  error: any;
  loading: boolean;
  exercise: Exercise;
  isModified: boolean;
  inEditMode: boolean;
  reps: RepsView[] = [];
  config: any;
  rawPoints: string;
  exerciseSaved: boolean;

  constructor(private router: Router, private sprintService: SprintService) {
  }

  ngOnInit(): void {
    this.loading = true;

    if (isUndefined(history.state.data)) {
      this.back();
      return;
    }
    this.exercise = new Exercise().deserialize(history.state.data);
    this.initRepsView();
    this.rawPoints = '' + this.exercise.getRawPoints();
    this.config = environment.EXERCISES.find(value => value.sid === this.exercise.getSid());
    this.isModified = false;
    this.loading = false;
  }

  back(): void {
    this.router.navigate(['/sprint'], {state: {isDataChanged: this.exerciseSaved}});
  }

  edit(): void {
    this.inEditMode = true;
  }

  cancel(): void {
    this.inEditMode = false;
    this.isModified = false;
    this.reps = [];
    this.initRepsView();
    this.rawPoints = '' + this.exercise.getRawPoints();
  }

  delete(): void {
    // TODO: delete exercise
  }

  save(): void {
    this.inEditMode = false;
    this.isModified = false;
    this.exerciseSaved = true;
    this.loading = true;

    this.exercise.setReps([]);
    this.reps.forEach(rep => {
      const newRep = new Reps();
      newRep.setWeight(this.getNumberFromString(rep.getWeight()));
      newRep.setReps(this.getNumberFromString(rep.getReps()));
      this.exercise.getReps().push(newRep);
    });

    this.exercise.setRawPoints(this.getFloatFromString(this.rawPoints));
    this.sprintService.updateExercise(this.exercise)
      .subscribe(data => {
        this.exercise = new Exercise().deserialize(data);
        this.initRepsView();
        this.rawPoints = '' + this.exercise.getRawPoints();
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  addReps(): void {
    const rep = new RepsView('', '');
    this.reps.push(rep);
    this.isModified = true;
  }

  deleteReps(index: number): void {
    this.reps.splice(index, 1);
    this.isModified = true;
  }

  canAddMoreReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === '' || element.getReps() === '');
    return emptyElements === -1;
  }

  changeWeight(index: number, $event): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getWeight());
    this.reps[index].setWeight(newValue);
    $event.target.value = newValue;
  }

  changeReps(index: number, $event): void {
    const newValue = this.modifyRepsElement($event.target.value, this.reps[index].getReps());
    this.reps[index].setReps(newValue);
    $event.target.value = newValue;
  }

  changeRawPoints($event): void {
    if (this.rawPoints !== $event.target.value) {
      this.isModified = true;
    }
    this.rawPoints = $event.target.value;
  }

  calcQuotaColor(): string {
    if (this.exercise.getQuota() < 26) {
      return 'quota-green';
    } else if (this.exercise.getQuota() >= 26 && this.exercise.getQuota() < 31) {
      return 'quota-yellow';
    } else {
      return 'quota-red';
    }
  }

  canSave(): boolean {
    let condis = false;
    if (this.config.withReps) {
      condis = (this.canAddMoreReps() && this.reps.length > 0);
    } else {
      condis = (this.getFloatFromString(this.rawPoints) !== 0);
    }
    return this.isModified && condis;
  }

  addPostfix(postfix: string, $event): void {
    $event.target.value = $event.target.value + ($event.target.value.length > 0 ? postfix : '');
  }

  removePostfix($event): void {
    if ($event.target.value.length > 0) {
      $event.target.value = this.getNumberFromString($event.target.value);
    }
  }

  private getFloatFromString(str: string): number {
    const numberValue = str.match(/\d+(\.\d+)?/);
    console.log('getFloatFromString=', numberValue);
    return (numberValue !== null ? +numberValue[0] : 0);
  }

  private getNumberFromString(str: string): number {
    const numberValue = str.match(/\d+/);
    return (numberValue !== null ? +numberValue[0] : 0);
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
      this.isModified = true;
    }
    const newNumberValue = this.getNumberFromString(newValue);
    return (newNumberValue === 0 ? '' : '' + newNumberValue);
  }
}
