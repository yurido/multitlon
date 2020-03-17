import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprint-exercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintDate} from "../models/SprintDate";

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

  constructor(private exerciseService: SprintService) {
  }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  private deserializeSprintExercises(json, clazz) {
    var instance = new clazz();
  };

  getExcercisesForCurrentSprint(): void {
    this.exerciseService.getCurrentSprint()
      .subscribe(data => {

        for (var obj in data) {
          if(typeof data[obj] === 'object') {

          }
          // this.sprintExercises.push(new SprintExercises(new SprintDate(data[i]['date'].
        }

        // this.sprintExercises = this.exerciseService.sortSprintExercisesByDate(sprint);
      });
  }

  addExercise(): void {

  }
}
