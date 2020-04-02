import {Component, Input, OnInit} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {isUndefined} from 'util';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  error: any;
  loading: boolean;
  exercise: Exercise;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    if (isUndefined(history.state.data)) {
      this.goBack();
      return;
    }
    this.exercise = new Exercise().deserialize(history.state.data);
    this.loading = false;
  }

  goBack(): void {
    console.log('goBack click!');
    this.router.navigate(['/activities']);
  }
}
