import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  error: any;
  loading: boolean;
  exercise: Exercise;
  item: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    if (isUndefined(history.state.data)) {
      this.goBack();
      return;
    }
    this.exercise = new Exercise().deserialize(history.state.data);
    this.setItem();
    this.loading = false;
  }

  goBack(): void {
    console.log('goBack click!');
    this.router.navigate(['/sprint']);
  }

  getExName(): string {
    return environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).name;
  }

  private setItem(): void {
     this.item = environment.EXERCISES.find(value => value.sid === this.exercise.getSid()).item;
  }
}
