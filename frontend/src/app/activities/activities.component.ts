import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprintExercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprintCalendar';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActivitiesComponent implements OnInit {
  sprintCalendar: SprintCalendar;
  sprintExercises: SprintExercises[];
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faChevronRight = faChevronRight;

  constructor(private exerciseService: SprintService) {
  }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.exerciseService.getCurrentSprint()
      .subscribe(data => {
        // TODO: deserialize response
        this.sprintCalendar = new SprintCalendar().deserialize(data);
        console.log('sprintCalendar =', this.sprintCalendar);
        // TODO: sort response
        // this.sprintExercises = this.exerciseService.sortSprintExercisesByDate(sprint);
      });
  }

  addExercise(): void {

  }
}
