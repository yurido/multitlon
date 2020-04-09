import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Reps} from "../models/reps";

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
    this.loading = false;
  }

  back(): void {
    console.log('goBack click!');
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
  }

  delete(): void {

  }

  save(): void {
    this.inEditMode = false;
    this.isModified = true;
  }

  addReps(): void {
    this.exercise.getReps().push(new Reps());
  }

  deleteReps(index: Reps): void {
    // this.exercise.setReps(this.exercise.getReps().splice(index));
  }

  private setItem(): void {
     this.item = environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).item;
  }
}
