import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Reps} from '../models/reps';

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
  item: string;
  isModified: boolean;
  inEditMode: boolean;
  reps: Reps[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    if (isUndefined(history.state.data)) {
      this.back();
      return;
    }
    this.exercise = new Exercise().deserialize(history.state.data);
    this.setItem();
    this.exercise.getReps().forEach(reps => this.reps.push(reps));

    this.loading = false;
  }

  back(): void {
    this.router.navigate(['/sprint']);
  }

  getExName(): string {
    return environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).name;
  }

  edit(): void {
    this.inEditMode = true;
  }

  cancel(): void {
    this.inEditMode = false;
    this.isModified = false;
    this.reps = [];
    this.exercise.getReps().forEach(reps => this.reps.push(reps));
  }

  delete(): void {
    // TODO: delete exercise
  }

  save(): void {
    this.inEditMode = false;
    this.isModified = true;
    this.exercise.setReps(this.reps);
    // TODO: call backend
    console.log(this.exercise.getReps());
  }

  addReps(): void {
    const rep = new Reps();
    rep.setReps(0);
    rep.setWeight(0);
    this.reps.push(rep);
    this.isModified = true;
  }

  deleteReps(index: number): void {
    this.reps.splice(index, 1);
    this.isModified = true;
  }

  canAddMoreReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === 0 || element.getReps() === 0);
    return emptyElements === -1;
  }

  changeWeight(index: number, $event): void {
    this.reps[index].setWeight(+this.changeInputElementValue($event));
  }

  changeReps(index: number, $event): void {
    console.log('change input ', index);
    this.reps[index].setReps(+this.changeInputElementValue($event));
  }

  private changeInputElementValue($event): number {
    const newStrValue = $event.target.value;
    console.log('value ', newStrValue);
    const newNumbValue = newStrValue.match(/\d+/);
    const value = (newNumbValue !== null ? newNumbValue[0] : '');
    $event.target.value = value;
    return value;
  }

  private setItem(): void {
    this.item = environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).item;
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
    return this.isModified && this.canAddMoreReps();
  }

  addKg(index: number, $event): void {
    const newValue = $event.target.value + ($event.target.value.length > 0 ? 'kg' : '');
    $event.target.value = newValue;
  }
}
