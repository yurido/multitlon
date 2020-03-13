import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExerciseService} from '../services/exercise.service';
import {SprintExercises} from '../models/sprint-exercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActivitiesComponent implements OnInit {
  sprintExercises: SprintExercises[];
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faChevronRight = faChevronRight;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.exerciseService.getCurrentSprint().subscribe(sprint => {
      this.sprintExercises = sprint;
    });
  }

  addExercise(): void {

  }
}
