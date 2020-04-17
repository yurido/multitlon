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
    console.log(this.exercise.getReps());
  }

  addReps(): void {
    const rep = new Reps();
    rep.setReps(0);
    rep.setWeight(0);
    this.reps.push(rep);
  }

  deleteReps(index: number): void {
    this.reps.splice(index, 1);
  }

  canAddMoreReps(): boolean {
    const emptyElements = this.reps.findIndex(element => element.getWeight() === 0 || element.getReps() === 0);
    return emptyElements === -1;
  }

  changeWeight(index: number, $event): void {
    this.reps[index].setWeight(+this.changeInputElementValue($event));
  }

  changeReps(index: number, $event): void {
    this.reps[index].setReps(+this.changeInputElementValue($event));
  }

  private changeInputElementValue($event): number {
    const newStrValue = $event.target.value;
    const newNumbValue = newStrValue.match(/\d+/);
    const value = (newNumbValue !== null ? newNumbValue[0] : 0);
    $event.target.value = value;
    return value;
  }

  private setItem(): void {
    this.item = environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).item;
  }
}
